import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { speciality } from '../models/speciality';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialityServiceService {
  url = 'https://api-hospital-novasalud-aebedqh3cfcrgfc8.ukwest-01.azurewebsites.net/api/especialidades';
  constructor(private httpClient:HttpClient){}
  listSpeciality(){
    console.log("Fetching specialities from: " + this.url);
    return this.httpClient.get<speciality[]>(this.url + '/listar');
  }
  addSpeciality(speciality:speciality){
    return this.httpClient.post<speciality>(this.url + '/registrar', speciality);
  }
  deleteSpeciality(id:number):Observable<any>{
    return this.httpClient.delete(this.url + `/eliminar/${id}`);
  }
  editSpeciality(id:number, speciality:speciality):Observable<any>{
    return this.httpClient.put<speciality>(this.url + `/actualizar/${id}`, speciality);
  }
  getSpeciality(id: number): Observable<speciality> {
    return this.httpClient.get<speciality>(this.url + `/listar/${id}`);
  }
}
