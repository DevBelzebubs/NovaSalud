import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  url = 'http://localhost:8080/api/doctor'
  constructor(private httpClient:HttpClient){}
  addDoctor(doctor:any):Observable<doctor>{
    return this.httpClient.post<any>(this.url + '/registar', doctor);
  }
  listDoctors():Observable<doctor[]>{
    return this.httpClient.get<any[]>(this.url +'/listar');
  }
  getDoctor(id:number):Observable<doctor>{
    return this.httpClient.get<any>(this.url + '/' + id);
  }
  editDoctor(doctor:any):Observable<doctor>{
    return this.httpClient.put<any>(this.url + '/editar/' + doctor.id, doctor);
  }
  deleteDoctor(id:number):Observable<doctor>{
    return this.httpClient.delete<any>(this.url + '/' + id);
  }
}
