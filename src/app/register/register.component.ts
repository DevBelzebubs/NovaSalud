import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { user } from '../../models/user';
import { patient } from '../../models/patient';
import { doctor } from '../../models/doctor';
import { PatientServiceService } from '../../services/patient-service.service';
import { UserServiceService } from '../../services/user-service.service';
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
  if (this.registerForm.invalid) {
    let errorMessage = '';
    const controls = this.registerForm.controls;

    if (controls['nombre'].hasError('required')) {
      errorMessage += '- El nombre es obligatorio.<br/>';
    }
    if (controls['apellido'].hasError('required')) {
      errorMessage += '- El apellido es obligatorio.<br/>';
    }
    if (controls['dni'].hasError('required')) {
      errorMessage += '- El DNI es obligatorio.<br/>';
    } else if (controls['dni'].hasError('pattern')) {
      errorMessage += '- El DNI debe tener exactamente 8 dígitos numéricos.<br/>';
    }
    if (controls['numero'].hasError('required')) {
      errorMessage += '- El número es obligatorio.<br/>';
    } else if (controls['numero'].hasError('pattern')) {
      errorMessage += '- El número debe tener exactamente 9 dígitos numéricos.<br/>';
    }
    if (controls['password'].hasError('required')) {
      errorMessage += '- La contraseña es obligatoria.<br/>';
    } else if (controls['password'].hasError('minlength') || controls['password'].hasError('maxlength')) {
      errorMessage += '- La contraseña debe tener entre 6 y 20 caracteres.<br/>';
    }
    if (controls['sexo'].hasError('required')) {
      errorMessage += '- Debe seleccionar el sexo.<br/>';
    }

    Swal.fire({
      title: 'Error en el formulario',
      html: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

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
        confirmButtonText: 'Aceptar'
      });
      this.registerForm.reset();
      this.route.navigate(['']);
    },
    error: (err) => {
      console.error('Error al registrar paciente:', err);

      let errorMessage = 'Ocurrió un error al registrar el paciente. Por favor, inténtalo de nuevo.';

      if (err.status === 400 || err.status === 409) {
        if (err.error && typeof err.error === 'string') {
          errorMessage = err.error;
        } else if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else {
          errorMessage = 'El paciente ya existe o los datos son inválidos.';
        }

        Swal.fire({
          title: 'Error de registro',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          title: 'Error inesperado',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  });
}
onLogin() {
  this.route.navigate(['/login']);
}
}
