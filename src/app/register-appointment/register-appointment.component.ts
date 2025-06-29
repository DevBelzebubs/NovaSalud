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
import { Schedule } from '../../models/schedule';
import { ScheduleServiceService } from '../shedule-service.service';
import { PatientServiceService } from '../patient-service.service';
import { AppointmentsDto } from '../interfaces/appointmentsDto';
import { AppointmentSharedServiceService } from '../appointment-shared-service.service';
@Component({
  selector: 'app-register-appointment',
  imports: [TopBarComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.css',
})
export class RegisterAppointmentComponent {
  appointmentForm!: FormGroup;
  specialities!: speciality[];
  doctors: DoctorDto[] = [];
  filteredDoctors: DoctorDto[] = [];
  availableDates: Schedule[] = [];
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private specialityService: SpecialityServiceService,
    private doctorService: DoctorServiceService,
    private appointMentService: AppointmentServiceService,
    private schedulesService: ScheduleServiceService,
    private pacienteService:PatientServiceService,
    private appointmentSharedService: AppointmentSharedServiceService
  ) {}
  ngOnInit() {
    this.appointmentForm = this.fb.group({
    doctor: this.fb.group({
      speciality: ['', Validators.required],
      id: ['', Validators.required],
    }),
    schedule: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
  });
    this.listSpeciality();
    this.listDoctor();
    this.appointmentForm.get('doctor.speciality')?.valueChanges.subscribe((specialityId) => {
    console.log('Especialidad seleccionada:', specialityId);
    this.filterDoctorsBySpeciality(specialityId);
    this.appointmentForm.get('doctor.name')?.reset('', { emitEvent: false });
  });
      this.loadAvailableSchedules();
  }
  loadAvailableSchedules() {
    this.pacienteService.listarHorario().subscribe({
      next: (data: Schedule[]) => {
        this.availableDates = data;
        console.log('Horarios disponibles:', this.availableDates);
      },
      error: (error) => {
        console.error('Error fetching available schedules:', error);
      },
    });
  }
  listSpeciality() {
    this.specialityService.listSpeciality().subscribe({
      next: (data) => {
        this.specialities = data;
      },
      error: (error) => {
        console.error('Error fetching specialities:', error);
      },
    });
  }
  listDoctor() {
    this.doctorService.listDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
      },
    });
  }
  filterDoctorsBySpeciality(specialityId: number) {
    const especialidadSeleccionada = this.specialities.find(
      (e) => e.id === +specialityId
    )?.nombre;
    if (!especialidadSeleccionada) {
      this.filteredDoctors = [];
      return;
    }
    this.filteredDoctors = this.doctors.filter(
      (doc) => doc.especialidad === especialidadSeleccionada
    );
  }
  onDoctorSelected(event: Event) {
  const target = event.target as HTMLSelectElement;
  const doctorId = target?.value;
  
  if (!doctorId) {
    this.availableDates = [];
    return;
  }
  const idNumber = +doctorId;
  this.appointmentForm.get('doctor.id')?.setValue(idNumber);
  this.loadAvailableSchedules();
}

  onHorarioSelected(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedId = +selectElement.value;
  if (!selectedId) return;
  const selectedHorario = this.availableDates.find(h => h.id === selectedId);
  if (!selectedHorario) return;
  this.appointmentForm.get('date')?.setValue(selectedHorario.fecha);
  this.appointmentForm.get('time')?.setValue(selectedHorario.horaInicio);
  this.appointmentForm.get('schedule')?.setValue(selectedId);
}
  onDoctorChange(doctorId:string) {
    if (!doctorId) {
      this.availableDates = [];
      return;
    }
    const id = +doctorId;
    this.appointmentForm.get('doctor.id')?.setValue(id);
    this.loadAvailableSchedules();
  }
  confirmAppointment() {
  console.log('Confirming appointment with form data:', this.appointmentForm.value);
  if (this.appointmentForm.valid) {
    const formData = this.appointmentForm.value;
    const doctorId = Number(formData.doctor.id);
    const horarioId = Number(formData.schedule);
    if (!doctorId || !horarioId) {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar un doctor y un horario válido.',
        icon: 'error',
      });
      return;
    }
    const appointmentRequest = new AppointmentsDto(doctorId, horarioId);
    this.appointmentSharedService.setAppointment(appointmentRequest);
    console.log('Datos de la cita guardados para pago:', appointmentRequest);
    this.route.navigate(['/pago']);
  } else {
    this.appointmentForm.markAllAsTouched();
  }
}
}