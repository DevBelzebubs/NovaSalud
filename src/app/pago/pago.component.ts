import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pago',
  imports: [CommonModule,FormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  selectedMethod:string = '';
    constructor(private route:Router) { }
  onMethodChange(){
    if(this.selectedMethod === 'mercadoPago'){
      this.loadMercadoPago();
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
  onConfirmPayment(){
    Swal.fire({
      title: '¡Pago realizado con éxito!',
      text: 'Gracias por tu compra.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/']);
      }
  });
  }
  }
