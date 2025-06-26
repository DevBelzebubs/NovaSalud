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
import { DoctorDto } from '../interfaces/doctorDto';
import { AppointmentServiceService } from '../appointment-service.service';
import { appointment } from '../../models/appointment';
@Component({
  selector: 'app-register-appointment',
  imports: [TopBarComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.css',
})
export class RegisterAppointmentComponent {
  appointmentForm!: FormGroup;
  specialities!:speciality[];
  doctors:DoctorDto[] = [];
  filteredDoctors: DoctorDto[] = [];
  constructor(private route: Router, private fb: FormBuilder, 
    private specialityService:SpecialityServiceService, 
    private doctorService:DoctorServiceService,private appointMentService:AppointmentServiceService){}
    
  ngOnInit() {
    this.appointmentForm = this.fb.group({
    doctor: this.fb.group({
      speciality: ['', Validators.required],
      name: ['', Validators.required]
    }),
    date: ['', Validators.required],
    time: ['', Validators.required]
  });
    this.listSpeciality();
    this.listDoctor();
    this.appointmentForm.get('doctor.speciality')?.valueChanges.subscribe(specialityId => {
      console.log(specialityId);
      this.filterDoctorsBySpeciality(specialityId);
      this.appointmentForm.get('doctor')?.setValue('');
      this.doctors.forEach(doc => {
        console.log(doc);
      });
    });
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

  filterDoctorsBySpeciality(specialityId: number) {
    const especialidadSeleccionada = this.specialities.find(e => e.id === +specialityId)?.nombre;
    if (!especialidadSeleccionada) {
      this.filteredDoctors = [];
      return;
    }
    this.filteredDoctors = this.doctors.filter(doc => doc.especialidad === especialidadSeleccionada);
  }

  confirmAppointment() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      const Appointment = new appointment(formData.doctor,formData.date,formData.time);
      console.log('Datos de la cita:', Appointment);
      this.appointMentService.guardarCita(Appointment).subscribe({
        next: (response) => {
          console.log('Cita registrada correctamente', response);
          Swal.fire({
            title: '¡Cita registrada exitosamente!',
            text: 'Su cita ha sido registrada correctamente.',
            icon: 'success',
          });
          this.appointmentForm.reset();
          this.route.navigate(['']);
        },
        error: (error) => {
          console.error('Error al registrar la cita:', error);
          Swal.fire({
            title: 'Error al registrar la cita',
            text: 'Por favor, intente nuevamente más tarde.',
            icon: 'error',
          });
        }
      });
    }else{
      this.appointmentForm.markAllAsTouched();
    }
  }
}
