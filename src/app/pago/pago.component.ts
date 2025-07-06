import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentSharedServiceService } from '../../services/appointment-shared-service.service';
import { AppointmentServiceService } from '../../services/appointment-service.service';
import { AppointmentsDto } from '../dtos/appointmentsDto';
import { PatientServiceService } from '../../services/patient-service.service';
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
    this.paymentForm = this.fb.group({
    cardHolder: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
  });
  }
  formatExpiryDate() {
    const control = this.paymentForm.get('expiryDate');
    let value = control?.value || '';
    value = value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    control?.setValue(value, { emitEvent: false });
  }
  formatCardNumber() {
    const control = this.paymentForm.get('cardNumber');
    let value = control?.value || '';
    value = value.replace(/\D/g, '');

    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    value = value.replace(/(.{4})/g, '$1 ').trim();
    control?.setValue(value, { emitEvent: false });
  }
  formatCVV() {
    const control = this.paymentForm.get('cvv');
    let value = control?.value || '';
    value = value.replace(/\D/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    control?.setValue(value, { emitEvent: false });
  }
  back(){
    this.route.navigate(['/citas'])
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
    if (this.selectedMethod === 'card') {
    if (this.paymentForm.invalid) {
      let errorMessage = '';

      const controls = this.paymentForm.controls;

      if (controls['cardHolder'].hasError('required')) {
        errorMessage += '- El nombre del titular es obligatorio.<br/>';
      }

      if (controls['cardNumber'].hasError('required')) {
        errorMessage += '- El número de tarjeta es obligatorio.<br/>';
      } else if (controls['cardNumber'].hasError('pattern')) {
        errorMessage += '- El número de tarjeta debe tener 16 dígitos numéricos.<br/>';
      }

      if (controls['expiryDate'].hasError('required')) {
        errorMessage += '- La fecha de expiración es obligatoria.<br/>';
      } else if (controls['expiryDate'].hasError('pattern')) {
        errorMessage += '- La fecha de expiración debe tener el formato MM/AA.<br/>';
      }
      if (controls['cvv'].hasError('required')) {
        errorMessage += '- El CVV es obligatorio.<br/>';
      } else if (controls['cvv'].hasError('pattern')) {
        errorMessage += '- El CVV debe tener 3 dígitos numéricos.<br/>';
      }
      Swal.fire({
        title: 'Error en los datos de tarjeta',
        html: errorMessage,
        icon: 'error'
      });

      return;
    }
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
    this.pacienteService.registrarCita(this.appointmentToRegister!).subscribe({
      next: (res) => {
        console.log('Cita registrada correctamente:', res);
        const resId = res.id;
        console.log(res.id);
        this.pacienteService.registrarBoletaParaCita(resId!).subscribe({
          next: (boleta) => {
            console.log('Boleta registrada correctamente:', boleta);
            Swal.fire({
              title: '¡Pago exitoso!',
              html: `
                <p>Tu cita ha sido registrada correctamente.</p>
                <p><strong>Boleta N°:</strong> ${boleta.id}</p>
                <p><strong>Monto:</strong> S/. ${boleta.monto}</p>
                <p><strong>Fecha:</strong> ${boleta.fecha}</p>
              `,
              icon: 'success'
            }).then(() => {
              this.appointmentSharedService.clearAppointment();
              this.route.navigate(['/']);
            });
          },
          error: (err) => {
            console.error('Error al generar la boleta:', err);
            Swal.fire({
              title: 'Error al generar la boleta',
              text: 'La cita se registró, pero hubo un problema con la boleta.',
              icon: 'warning'
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar la cita:', err);
        Swal.fire({
          title: 'Error al registrar la cita',
          text: 'No se pudo completar el registro de la cita. Inténtelo de nuevo.',
          icon: 'error'
        });
      }
    });
  }, 1500);
  }
}