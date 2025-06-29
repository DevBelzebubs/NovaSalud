import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { patient } from '../models/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  url = 'http://localhost:8080/api/paciente';
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
  registrarCita(appointment:any){
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(`${this.url}/registrar-cita`, appointment, { headers });
  }
}
