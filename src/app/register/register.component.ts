import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { user } from '../../models/user';
import { patient } from '../../models/patient';
import { doctor } from '../../models/doctor';
import { PatientServiceService } from '../patient-service.service';
import { UserServiceService } from '../user-service.service';

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
  onRegister(){
    if(this.registerForm.valid){
      const data = this.registerForm.value;
      const newUser = new user(
      0,
      data.username,
      data.password,
      data.nombre,
      data.apellido,
      data.dni,
      data.numero,
      data.sexo,
      data.rol,
      data.status
    );
    this.userService.addUser(newUser).subscribe({
      next: (response) => {
        const patientEntity = new patient(0,response,0,0);
        this.patientService.addPatient(patientEntity).subscribe({
          next: (response) => {
            console.log('Usuario registrado con éxito:', response);
            this.usuariosRegistrados.push(response);
            this.registerForm.reset();
          },
          error: (error) => {
            console.error('Error al registrar paciente:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
      }
    })
    }
  }
}