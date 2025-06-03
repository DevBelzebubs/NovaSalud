import { Component } from '@angular/core';
import { appointment } from '../../models/appointment';
import { patient } from '../../models/patient';
import { user } from '../../models/user';
import { doctor } from '../../models/doctor';
import { HomeMainComponent } from "../home-main/home-main.component";
import { TopBarComponent } from "../top-bar/top-bar.component";

@Component({
  selector: 'app-doctor-main',
  imports: [HomeMainComponent, TopBarComponent],
  templateUrl: './doctor-main.component.html',
  styleUrl: './doctor-main.component.css'
})
export class DoctorMainComponent {
  citas:appointment[] = []
}
