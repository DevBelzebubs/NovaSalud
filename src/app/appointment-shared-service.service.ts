import { Injectable } from '@angular/core';
import { AppointmentsDto } from './interfaces/appointmentsDto';
@Injectable({
  providedIn: 'root'
})
export class AppointmentSharedServiceService {
  private appointment: AppointmentsDto | null = null;

  setAppointment(appointment: AppointmentsDto) {
    this.appointment = appointment;
  }
  getAppointment(): AppointmentsDto | null {
    return this.appointment;
  }
  clearAppointment(): void {
    this.appointment = null;
  }
}
