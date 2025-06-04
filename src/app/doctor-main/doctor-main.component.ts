import { Component } from '@angular/core';
import { appointment } from '../../models/appointment';
import { patient } from '../../models/patient';
import { user } from '../../models/user';
import { doctor } from '../../models/doctor';
import { HomeMainComponent } from "../home-main/home-main.component";
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-main',
  imports: [HomeMainComponent, TopBarComponent],
  templateUrl: './doctor-main.component.html',
  styleUrl: './doctor-main.component.css'
})
export class DoctorMainComponent {
  citas:appointment[] = []
  constructor(private route:Router){}
  registrarHorario(){
    this.route.navigate(['/registrar-horario'])
  }
  salir(){
      this.route.navigate(['/']);
  }
}
