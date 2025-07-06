import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { patient } from '../models/patient';
import { Observable } from 'rxjs';
import { AppointmentsDto } from '../app/dtos/appointmentsDto';
import { BoletaDto } from '../app/dtos/boletaDto';
import { CitaMedicaDto } from '../app/dtos/citaMedicaDto';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  url = 'https://api-hospital-novasalud-aebedqh3cfcrgfc8.ukwest-01.azurewebsites.net/api/paciente';
  constructor(private httpClient:HttpClient){}

  addPatient(patient:patient):Observable<patient>{
    return this.httpClient.post<patient>(this.url + '/registrar', patient);
  }
  listPatients():Observable<patient[]>{
    return this.httpClient.get<patient[]>(this.url + '/listar');
  }
  getPatient(id:number):Observable<patient>{
    return this.httpClient.get<patient>(this.url + '/' + id);
  }
  editPatient(patient:patient):Observable<patient>{
    return this.httpClient.put<patient>(this.url + '/' + patient.id, patient);
  }
  deletePatient(id:number):Observable<patient>{
    return this.httpClient.delete<patient>(this.url + '/eliminar/' + id);
  }
  listarHorario(){
    return this.httpClient.get<any[]>(`${this.url}/listar-horario`);
  }
  registrarCita(appointment: AppointmentsDto): Observable<CitaMedicaDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<CitaMedicaDto>(
      `${this.url}/registrar-cita-con-id`,
      appointment,
      { headers }
    );
  }
  listarCitas(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/mis-citas`);
  }
  registrarBoletaParaCita(citaId: number): Observable<BoletaDto> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<BoletaDto>(
      `${this.url}/cita/${citaId}/boleta`,
      {},
      { headers }
    );
  }

}
