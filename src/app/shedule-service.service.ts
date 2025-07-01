import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Schedule } from '../models/schedule';
@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {
  private url = 'http://localhost:8080/api/doctor';
  constructor(private httpClient: HttpClient) { } 
  listarHorarios() {
    return this.httpClient.get<any[]>(`${this.url}/listar`);
  }
  guardarHorarios(schedule: Schedule){
    return this.httpClient.post<any>(`${this.url}/agregar-horario`, schedule, {
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
