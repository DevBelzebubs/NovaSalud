import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = '';
  constructor(private httpClient:HttpClient){}
  login(username:string,password:string){
    return this.httpClient.post(this.url + '/login',{
      username,
      password
    });
  }
  saveToken(token:string){
    localStorage.setItem('jwt_token',token)
  }
  getToken(): string | null{
    return localStorage.getItem('jwt_token')
  }
  logout(){
    localStorage.removeItem('jwt_token');
  }
  isLoggedIn(): boolean{
    return !!this.getToken();
  }
}
