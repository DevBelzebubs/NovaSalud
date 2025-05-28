import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { user } from '../../models/user';
import { patient } from '../../models/patient';
import { doctor } from '../../models/doctor';
import { PatientServiceService } from '../patient-service.service';
import { UserServiceService } from '../user-service.service';
import { switchMap } from 'rxjs';
import { Role } from '../../models/role';

@Component({
  selector: 'app-register',
  imports: [TopBarComponent,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!:FormGroup;
  constructor(private fb:FormBuilder,private patientService:PatientServiceService,private userService:UserServiceService) {}
  usuariosRegistrados: (user | patient | doctor)[] = [];
  ngOnInit(){
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      numero: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      sexo: ['', Validators.required]
    });
  }
  onRegister() {
  if (this.registerForm.valid) {
    const formData = this.registerForm.value;
    const newUser = new user(
      undefined,
      formData.username,
      formData.password,
      formData.nombre,
      formData.apellido,
      formData.numero,
      formData.sexo,
      { nombreRol: 'ROL_PACIENTE' }
    );
    this.userService.addUser(newUser).pipe(
      switchMap((registeredUser) => {
        const patientUser = new user(
          undefined,
          undefined,
          registeredUser.contrasena,
          registeredUser.nombre,
          registeredUser.apellido,
          registeredUser.numero,
          registeredUser.sexo
        );
        const newPatient = new patient(
          undefined,
          formData.dni,
          patientUser
        );
        console.log('Datos del paciente a enviar:', JSON.stringify(newPatient));
        return this.patientService.addPatient(newPatient);
      })
    ).subscribe({
      next: (registeredPatient) => {
        console.log('Registro completado:', registeredPatient);
        this.usuariosRegistrados.push(registeredPatient);
        this.registerForm.reset();
        console.log('Registro completado exitosamente');
      },
      error: (err) => {
        console.error('Error en el registro del paciente:', err);
        const formData = this.registerForm.value;
        const patientUser = new user(
          undefined,
          undefined,
          formData.password,
          formData.nombre,
          formData.apellido,
          formData.numero,
          formData.sexo,
          { nombreRol: 'ROL_PACIENTE' }
        );
        const newPatient = new patient(
          undefined,
          formData.dni,
          patientUser
        );
        this.patientService.addPatient(newPatient).subscribe({
          next: (forcedPatient) => {
            this.usuariosRegistrados.push(forcedPatient);
            this.registerForm.reset();
            console.log('Paciente registrado en segundo intento:', forcedPatient);
          },
          error: (secondErr) => {
            console.error('Error incluso en el segundo intento de registrar paciente:', secondErr);
          }
        });
      }
    });
  }
}

}