import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appointment } from '../models/appointment';
@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {
  private url = 'http://localhost:8080/api/';
  constructor(private httpClient: HttpClient) { }
  listarHorarios() {
    return this.httpClient.get<any[]>(`${this.url}/listar`);
  }
  guardarHorarios(appointment: appointment){
    return this.httpClient.post<any>(`${this.url}/guardar`, appointment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  });
}
  eliminarHorario(id: number) {
    const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    return this.httpClient.delete<any>(`${this.url}/eliminar/${id}`, { headers: headers });
    }
}
