import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentSharedServiceService } from '../appointment-shared-service.service';
import { AppointmentServiceService } from '../appointment-service.service';
import { AppointmentsDto } from '../interfaces/appointmentsDto';
import { PatientServiceService } from '../patient-service.service';
@Component({
  selector: 'app-pago',
  imports: [CommonModule, FormsModule, TopBarComponent,ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  selectedMethod:string = '';
  paymentForm!: FormGroup;
  appointmentToRegister!: AppointmentsDto | null;
  constructor(private route:Router 
    ,private fb: FormBuilder
    ,private appointmentSharedService: AppointmentSharedServiceService
    ,private appointmentService: AppointmentServiceService 
    ,private pacienteService:PatientServiceService){}
  onMethodChange(){
    if(this.selectedMethod === 'mercadoPago'){
      this.loadMercadoPago();
    }
  }
  goBackToForm() {
  this.route.navigate(['/citas']);
}
  ngOnInit(){
    this.appointmentToRegister = this.appointmentSharedService.getAppointment();
    if(!this.appointmentToRegister){
      Swal.fire({
        title: 'Error',
        text: 'No se encontró la cita a pagar.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.route.navigate(['/']);
      });
      this.route.navigate(['/citas']);
    }
  }
  loadMercadoPago(){
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      const mp = new (window as any).MercadoPago('APP_USR-c6d4ad97-a4ed-4f6b-80c8-7936d54987c8', {
        locale: 'es-PE'
      });
      mp.checkout({
        preference: {
          id: 'YOUR_PREFERENCE_ID'
        },
        render: {
          container: '#wallet_container',
          label: 'Pagar con Mercado Pago',
        }
      });
    };
  }
  onConfirmPayment() {
    if (!this.appointmentToRegister) {
      Swal.fire({
        title: 'Error',
        text: 'No hay datos de cita para registrar.',
        icon: 'error'
      });
      return;
    }
    Swal.fire({
      title: 'Procesando pago...',
      text: 'Por favor, espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    setTimeout(() => {
      this.pacienteService.registrarCita(this.appointmentToRegister).subscribe({
        next: (response) => {
          console.log('Cita registrada correctamente', response);
          Swal.fire({
            title: '¡Pago exitoso!',
            text: 'Tu cita ha sido registrada correctamente.',
            icon: 'success'
          }).then(() => {
            this.appointmentSharedService.clearAppointment();
            this.route.navigate(['/']);
          });
        },
        error: (error) => {
          console.error('Error al registrar la cita:', error);
          Swal.fire({
            title: 'Error al registrar la cita',
            text: 'Inténtelo nuevamente más tarde.',
            icon: 'error'
          });
        }
      });
    }, 1500);
  }
}