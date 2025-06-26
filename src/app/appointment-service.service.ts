import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {
  private url = 'http://localhost:8080/api/cita-medica';
  constructor(private httpClient: HttpClient){ }
  listarCitas() {
    return this.httpClient.get<any[]>(`${this.url}/listar`);
  }
  guardarCita(appointment:appointment){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<any>(`${this.url}/guardar`, appointment, { headers: headers });
  }
}
