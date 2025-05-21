import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { receptionist } from '../models/recepcionist';

@Injectable({
  providedIn: 'root'
})
export class RecepcionistService {
  url = 'http://localhost:8080/api/recepcionista'
  constructor(private httpClient:HttpClient){}
  addRecepcionist(recepcionist:receptionist){
    return this.httpClient.post<any>(this.url + '/registrar', recepcionist);
  }
  listRecepcionists(){
    return this.httpClient.get<any[]>(this.url + '/listar');
  }
  getRecepcionist(id:number){
    return this.httpClient.get<any>(this.url + '/' + id);
  }
  editRecepcionist(recepcionist:receptionist){
    return this.httpClient.put<any>(this.url + '/editar/' + recepcionist.id, recepcionist);
  }
  deleteRecepcionist(id:number){
    return this.httpClient.delete<any>(this.url + '/eliminar' + id);
  }
}
