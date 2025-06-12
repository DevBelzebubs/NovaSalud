import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { speciality } from '../models/speciality';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialityServiceService {
  url = 'http://localhost:8080/api/especialidades'
  constructor(private httpClient:HttpClient){}
  listSpeciality(){
    return this.httpClient.get<speciality[]>(this.url + '/listar');
  }
  addSpeciality(speciality:speciality){
    return this.httpClient.post<speciality>(this.url + '/registrar', speciality);
  }
  deleteSpeciality(id:number):Observable<any>{
    return this.httpClient.delete(this.url + `/eliminar/${id}`);
  }
}
