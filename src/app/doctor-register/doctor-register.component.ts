import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleServiceService } from '../../services/shedule-service.service';
import { Schedule } from '../../models/schedule';
import Swal from 'sweetalert2';
import { DoctorServiceService } from '../../services/doctor-service.service';
import { Pipe } from '@angular/core';
import { CitaMedicaDto } from '../dtos/citaMedicaDto';
@Component({
  selector: 'app-doctor-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './doctor-register.component.html',
  styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent {
  doctorRegisterForm!:FormGroup;
  scheduleList!: Schedule[];
  citasDoctor:CitaMedicaDto[] = [];
  constructor(private fb:FormBuilder, private route:Router,private scheduleService:ScheduleServiceService, private doctorService:DoctorServiceService){}
  onSubmit() {
  if (this.doctorRegisterForm.invalid) {
    let errorMessage = '';
    const controls = this.doctorRegisterForm.controls;

    if (controls['fecha'].hasError('required')) {
      errorMessage += '- La fecha es obligatoria.<br/>';
    }
    if (controls['horaInicio'].hasError('required')) {
      errorMessage += '- La hora de inicio es obligatoria.<br/>';
    }
    if (controls['horaFin'].hasError('required')) {
      errorMessage += '- La hora de fin es obligatoria.<br/>';
    }

    Swal.fire({
      title: 'Error en el formulario',
      html: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const formData = this.doctorRegisterForm.value;

  // ✅ Validación de fecha en el pasado
  const selectedDate = new Date(formData.fecha);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Comparar solo fecha, no hora

  if (selectedDate < today) {
    Swal.fire({
      title: 'Fecha inválida',
      text: 'No se puede asignar horarios en fechas pasadas.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // ✅ Validar que la hora de inicio sea antes de la hora de fin
  if (formData.horaInicio >= formData.horaFin) {
    Swal.fire({
      title: 'Horario inválido',
      text: 'La hora de inicio debe ser anterior a la hora de fin.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  console.log("Form Data:", JSON.stringify(formData));
  const schedule = new Schedule(undefined, formData.fecha, formData.horaInicio, formData.horaFin);

  this.scheduleService.guardarHorarios(schedule).subscribe({
    next: (response) => {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Horario guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      console.log('Schedule saved successfully:', response);
      this.loadSchedules();
      this.doctorRegisterForm.reset();
    },
    error: (error) => {
      console.error('Error saving schedule:', error);
      let errorMsg = 'Ocurrió un error al guardar el horario.';

      if (error.status === 400 && error.error) {
        if (typeof error.error === 'string') {
          errorMsg = error.error;
        } else if (error.error.message) {
          errorMsg = error.error.message;
        }
      }

      Swal.fire({
        title: 'Error',
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });
}

  ngOnInit(){
    this.doctorRegisterForm = this.fb.group({
      fecha:['', Validators.required],
      horaInicio:['', Validators.required],
      horaFin:['', Validators.required]
    });
    this.loadSchedules();
  }
  goBack(){
    this.route.navigate(['/doctor']);
  }
  loadSchedules() {
    this.doctorService.listarHorarios().subscribe({
      next: (response) => {
        this.scheduleList = response;
        console.log('Schedules loaded successfully:', this.scheduleList);
      },
      error: (error) => {
        console.error('Error loading schedules:', error);
      }
    });
  }
  deleteSchedule(id?:number){
    if(id===undefined){
      console.error("No schedule ID provided");
      return;
    }
    this.scheduleService.eliminarHorario(id).subscribe({
      next: (response) => {
        console.log('Schedule deleted successfully:', response);
        this.loadSchedules();
      }
      , error: (error) => {
        console.error('Error deleting schedule:', error);
      }
  });
}
}
