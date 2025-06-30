import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleServiceService } from '../shedule-service.service';
import { Schedule } from '../../models/schedule';
import Swal from 'sweetalert2';
import { DoctorServiceService } from '../doctor-service.service';
@Component({
  selector: 'app-doctor-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './doctor-register.component.html',
  styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent {
  doctorRegisterForm!:FormGroup;
  scheduleList!: any[];
  constructor(private fb:FormBuilder, private route:Router,private scheduleService:ScheduleServiceService, private doctorService:DoctorServiceService){}
  onSubmit(){
    const formData = this.doctorRegisterForm.value;
    console.log("Form Data:", JSON.stringify(formData));
    const schedule = new Schedule(undefined,formData.fecha, formData.horaInicio, formData.horaFin);
    this.scheduleService.guardarHorarios(schedule).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Horario guardado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        console.log('Schedule saved successfully:', response);
        this.loadSchedules();
        this.doctorRegisterForm.reset();
      },
      error: (error) => {
        console.error('Error saving schedule:', error);
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
  deleteSchedule(id:number){
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
