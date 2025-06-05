import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { speciality } from '../models/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityServiceService {
  url = 'http://localhost:8080/api/especialidades'
  constructor(private httpClient:HttpClient){}
  listSpeciality(){
    return this.httpClient.get<speciality[]>(this.url + '/listar');
  }
}
