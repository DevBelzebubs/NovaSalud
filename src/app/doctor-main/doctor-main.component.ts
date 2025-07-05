import { Component } from '@angular/core';
import { appointment } from '../../models/appointment';
import { patient } from '../../models/patient';
import { user } from '../../models/user';
import { doctor } from '../../models/doctor';
import { HomeMainComponent } from "../home-main/home-main.component";
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from '@angular/router';
import { SpecialityServiceService } from '../speciality-service.service';
import { PatientServiceService } from '../patient-service.service';

@Component({
  selector: 'app-doctor-main',
  imports: [HomeMainComponent, TopBarComponent],
  templateUrl: './doctor-main.component.html',
  styleUrl: './doctor-main.component.css'
})
export class DoctorMainComponent {
  citas:patient[] = []
  constructor(private route:Router, private patientService:PatientServiceService){
    this.listCitas();
  }
  registrarHorario(){
    this.route.navigate(['/registrar-horario'])
  }
  salir(){
      this.route.navigate(['/']);
  }
  listCitas(){
    this.patientService.listarCitas().subscribe({
      next:(data) =>{
        this.citas = data;
      },
      error:(err) =>{
        console.error(err);
      }
    })
  }
}
