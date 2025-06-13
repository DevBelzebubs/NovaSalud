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
import { SpecialityServiceService } from '../speciality-service.service';
import { doctor } from '../../models/doctor';
import { DoctorServiceService } from '../doctor-service.service';
import { UserServiceService } from '../user-service.service';
import { user } from '../../models/user';
@Component({
  selector: 'app-register-appointment',
  imports: [TopBarComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.css',
})
export class RegisterAppointmentComponent {
  appointmentForm!: FormGroup;
  specialities!:speciality[];
  doctors!:doctor[];
  constructor(private route: Router, private fb: FormBuilder, 
    private specialityService:SpecialityServiceService, 
    private doctorService:DoctorServiceService, 
    private userService:UserServiceService) {}
  ngOnInit() {
    this.appointmentForm = this.fb.group({
      speciality: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
    this.listSpeciality();
    this.listDoctor();
  }
  listSpeciality(){
    this.specialityService.listSpeciality().subscribe({
      next: (data) => {
        this.specialities = data;
      },
      error: (error) => {
        console.error("Error fetching specialities:", error);
      }
    })
  }
  listDoctor() {
  this.doctorService.listDoctors().subscribe({
    next: (data) => {
      this.doctors = data;
    },
    error: (error) => {
      console.error("Error fetching doctors:", error);
    }
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
