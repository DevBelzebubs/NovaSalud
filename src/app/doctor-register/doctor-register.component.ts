import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleServiceService } from '../shedule-service.service';

@Component({
  selector: 'app-doctor-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './doctor-register.component.html',
  styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent {
  doctorRegisterForm!:FormGroup;
  scheduleList!: any[];
  constructor(private fb:FormBuilder, private route:Router,private scheduleService:ScheduleServiceService){}
  onSubmit(){
    const formData = this.doctorRegisterForm.value;
    console.log("Form Data:", formData);
  }
  ngOnInit(){
    this.doctorRegisterForm = this.fb.group({
      scheduleDate:['', Validators.required],
      scheduleTime:['', Validators.required],
    });
  }
  goBack(){
    this.route.navigate(['/doctor']);
  }
  loadSchedules() {
    this.scheduleService.listarHorarios().subscribe({
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
        this.loadSchedules(); // Reload schedules after deletion
      }
      , error: (error) => {
        console.error('Error deleting schedule:', error);
      }
  });
}
}
