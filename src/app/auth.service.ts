import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080';

  private currentUserSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient:HttpClient){
    this.loadUserData();
  }

  login(username:string,password:string){
    const body = {
      nombreUsua: username,
      contrasena: password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<any>(`${this.url}/login`, body, {
      headers: headers,
      observe: 'response'
    });
  }
  saveToken(token:string){
    localStorage.setItem('jwt_token',token);
  }
  saveUserData(user: any) {
    localStorage.setItem('usuario', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  getUserData() {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }
  loadUserData() {
  const storedUser = localStorage.getItem('usuario');
  if (storedUser) {
    this.currentUserSubject.next(JSON.parse(storedUser));
  }
}
  getRole(): string | null {
    const user = this.getUserData();
    return user ? user.rol : null;
  }
  getToken(): string | null{
    return localStorage.getItem('jwt_token');
  }
  logout(){
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('usuario');
    this.currentUserSubject.next(null);
    window.location.href = '/';
  }
  isLoggedIn(): boolean{
    const token = this.getToken();
    return token != null && token.length > 0;
  }
}
