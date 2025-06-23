import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { prescription } from '../../models/prescription';
import { appointment } from '../../models/appointment';

@Component({
  selector: 'app-historial-citas',
  imports: [TopBarComponent],
  templateUrl: './historial-citas.component.html',
  styleUrl: './historial-citas.component.css'
})
export class HistorialCitasComponent {
  citas:appointment[] = [];
}
