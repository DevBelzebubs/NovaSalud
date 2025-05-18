import { Component } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { speciality } from '../../models/speciality';
@Component({
  selector: 'app-register-appointment',
  imports: [TopBarComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.css',
})
export class RegisterAppointmentComponent {
  appointmentForm!: FormGroup;
  constructor(private route: Router, private fb: FormBuilder) {}
  ngOnInit() {
    this.appointmentForm = this.fb.group({
      speciality: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }
  confirmAppointment() {
    if (this.appointmentForm.valid) {
      Swal.fire({
        title: 'Cita confirmada',
        text: 'Su cita ha sido confirmada exitosamente.',
        icon: 'success',
        confirmButtonText: 'Ir a pagar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.route.navigate(['/pago']);
        }
      });
    }else{
      this.appointmentForm.markAllAsTouched();
    }
  }
}
