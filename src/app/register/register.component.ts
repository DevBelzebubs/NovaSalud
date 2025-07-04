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
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [TopBarComponent,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!:FormGroup;
  constructor(private fb:FormBuilder,private patientService:PatientServiceService,private route: Router) {}
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
  const formData = this.registerForm.value;

  const newPatient = new patient(
    undefined,
    formData.dni,
    formData.nombre,
    formData.apellido,
    formData.password,
    formData.numero,
    formData.sexo
  );

  this.patientService.addPatient(newPatient).subscribe({
    next: (registeredPatient) => {
      console.log('Paciente registrado correctamente', registeredPatient);
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'El paciente ha sido registrado correctamente.',
        icon: 'success',
      });
      this.registerForm.reset();
      this.route.navigate(['']);
    },
    error: (err) => {
      console.error('Error al registrar paciente:', err);
    }
  });
}
onLogin() {
  this.route.navigate(['/login']);
}
}
