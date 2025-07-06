import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { doctor } from '../models/doctor';
import { DoctorDto } from '../app/dtos/doctorDto';
import { Schedule } from '../models/schedule';
import { CitaMedicaDto } from '../app/dtos/citaMedicaDto';
import { GestionCitaDto } from '../app/dtos/gestionCitaDto';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  url = 'https://api-hospital-novasalud-aebedqh3cfcrgfc8.ukwest-01.azurewebsites.net/api/doctor';
  constructor(private httpClient:HttpClient){}
  addDoctor(doctor:doctor):Observable<doctor>{
    return this.httpClient.post<doctor>(this.url + '/registrar', doctor);
  }
  listDoctors():Observable<DoctorDto[]>{
    return this.httpClient.get<DoctorDto[]>(this.url +'/listar');
  }
  getDoctor(id:number):Observable<doctor>{
    return this.httpClient.get<doctor>(this.url + '/' + id);
  }
  editDoctor(doctor:doctor):Observable<doctor>{
    return this.httpClient.put<doctor>(this.url + '/editar/' + doctor.id, doctor);
  }
  deleteDoctor(id:number):Observable<doctor>{
    return this.httpClient.delete<doctor>(this.url + '/eliminar' + id);
  }
  listarHorarios(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + '/listar-horario');
  }
  listarHorariosPorDoctor(doctorId: number): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(this.url + `/listar-horario/${doctorId}`);
  }
  listCitasByDoctor():Observable<CitaMedicaDto[]>{
    return this.httpClient.get<CitaMedicaDto[]>(this.url + '/listar-citas');
  }
  gestionCita(id:number,gestionCita:GestionCitaDto){
    return this.httpClient.put<GestionCitaDto>(this.url + '/cita/gestion/' + id,gestionCita);
  }
}
