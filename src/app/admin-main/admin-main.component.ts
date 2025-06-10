import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from '@angular/router';
import { SpecialityServiceService } from '../speciality-service.service';
import { speciality } from '../../models/speciality';

@Component({
  selector: 'app-admin-main',
  imports: [TopBarComponent],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {
  specialities:speciality[] = [];
  constructor(private route:Router, private specialityService:SpecialityServiceService){}
  doctorRegister(){
    this.route.navigate(['/registrar-doctor']);
  }
  recepcionistRegister(){
    this.route.navigate(['/registrar-recepcionista']);
  }
  ngOnInit() {
    this.specialityService.listSpeciality().subscribe({
      next: (data) => {
        this.specialities = data;
      },
      error: (error) => {
        console.error("Error fetching specialities:", error);
      }
    })
  }
  editSpeciality(){
    
  }
  deleteSpeciality(){

  }
}
