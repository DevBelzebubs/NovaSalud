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
    const data = this.registerForm.value;
    const newUser = new user(
      undefined,
      data.username,
      data.password,
      data.nombre,
      data.apellido,
      data.numero,
      data.sexo,
      { nombreRol: 'ROL_PACIENTE' }
    );

    this.userService.addUser(newUser).subscribe({
      next: (userResponse) => {
        console.log('Usuario registrado con éxito', userResponse);
        const userWithoutRole = new user(
          undefined,
          userResponse.nombreUsua,
          userResponse.contrasena,
          userResponse.nombre,
          userResponse.apellido,
          userResponse.numero,
          userResponse.sexo
          // Sin rol
        );
        const newPatient = new patient(undefined, data.dni, userWithoutRole);
        this.patientService.addPatient(newPatient).subscribe({
          next: (pacienteResponse) => {
            console.log('Paciente registrado con éxito', pacienteResponse);
            this.usuariosRegistrados.push(pacienteResponse);
            this.registerForm.reset();
          },
          error: (error) => {
            console.error('Error al registrar paciente:', error);
            console.log(JSON.stringify(newPatient, null, 2));
          }
        });
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        console.log(JSON.stringify(newUser, null, 2));
      }
    }
  );
  }
}

}