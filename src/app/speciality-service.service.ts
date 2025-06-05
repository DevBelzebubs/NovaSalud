import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { speciality } from '../models/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityServiceService {

  constructor(private httpClient:HttpClient, private speciality:speciality){}
  listSpeciality(){
    return this.httpClient.get<speciality[]>()
  }
}
