import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { prescription } from '../../models/prescription';
import { appointment } from '../../models/appointment';
import { PatientServiceService } from '../patient-service.service';

@Component({
  selector: 'app-historial-citas',
  imports: [TopBarComponent],
  templateUrl: './historial-citas.component.html',
  styleUrl: './historial-citas.component.css'
})
export class HistorialCitasComponent {
  citas:appointment[] = [];
  constructor(private patientService: PatientServiceService){}
  ngOnInit() {
    this.patientService.listarCitas().subscribe(citas => {
      this.citas = citas;
      console.log(this.citas);
    });
  }
}
