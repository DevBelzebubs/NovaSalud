import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = 'https://api-hospital-novasalud-aebedqh3cfcrgfc8.ukwest-01.azurewebsites.net/api/usuarios';
  constructor(private httpClient:HttpClient){}
  addUser(user:user){
    return this.httpClient.post<user>(this.url + '/registrar', user);
  }
  listUsers(){
    return this.httpClient.get<user[]>(this.url + '/listar');
  }
  getUser(id:number){
    return this.httpClient.get<user>(this.url + '/' + id);
  }
  editUser(user:user){
    return this.httpClient.put<user>(this.url + '/editar/' + user.id, user);
  }
  deleteUser(id:number){
    return this.httpClient.delete<user>(this.url + '/eliminar' + id);
  }
}
