import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-appointment',
  imports: [TopBarComponent],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.css'
})
export class RegisterAppointmentComponent {
  constructor(private route:Router) { }
  confirmAppointment(){
    Swal.fire({
      title: 'Cita confirmada',
      text: 'Su cita ha sido confirmada exitosamente.',
      icon: 'success',
      confirmButtonText: 'Ir a pagar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.route.navigate(['/pago']);
    }
  });
}
}
