import { Component, ElementRef, ViewChild } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { prescription } from '../../models/prescription';
import { appointment } from '../../models/appointment';
import { PatientServiceService } from '../../services/patient-service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-historial-citas',
  imports: [TopBarComponent],
  templateUrl: './historial-citas.component.html',
  styleUrl: './historial-citas.component.css'
})
export class HistorialCitasComponent {
  citas:appointment[] = [];
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  constructor(private patientService: PatientServiceService){}
  ngOnInit() {
    this.patientService.listarCitas().subscribe(citas => {
      this.citas = citas;
      console.log(this.citas);
    });
  }
  downloadPDF(){
    const element = this.pdfContent.nativeElement;
    html2canvas(element,{scale:2}).then((canvas)=>{
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p','mm','a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const targetWidth = pdfWidth * 1.8;
      const targetHeight = (canvas.height * targetWidth) / canvas.width;
      let posY = 0;
      if (targetHeight < pdfHeight) {
        posY = (pdfHeight - targetHeight) / 2;
      }
      pdf.addImage(imgData, 'PNG', (pdfWidth - targetWidth) / 2, posY, targetWidth, targetHeight);
      pdf.save('citas.pdf');
    })
  }
}
