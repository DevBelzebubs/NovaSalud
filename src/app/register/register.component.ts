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
  constructor(private fb:FormBuilder,private patientService:PatientServiceService) {}
  usuariosRegistrados: (user | patient | doctor)[] = [];
  ngOnInit(){
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      numero: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      sexo: ['', Validators.required]
    });
  }
  onRegister() {
  if (this.registerForm.valid) {
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
    console.log('Datos del paciente a enviar:', JSON.stringify(newPatient));
    this.patientService.addPatient(newPatient).subscribe({
      next: (registeredPatient) => {
        console.log(registeredPatient);
        //this.usuariosRegistrados.push(registeredPatient);
        this.registerForm.reset();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}


}