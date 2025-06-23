import { Component, Input } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  public username: string | null = null;
  nombre: string = '';
  constructor(private route: Router, private authService:AuthService){}
  ngOnInit() {
    const usu = this.authService.getUserData()
        if(usu){
      this.username = usu.nombre
    }
    this.authService.loadUserData();
  }
  login(){
    this.route.navigate(['/login']);
  }
  register(){
    this.route.navigate(['/register']);
  }
  inicio(){
    this.route.navigate(['/']);
  } 
  goTo(path: string){
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if(this.route.navigated){
      
    }
  }
  logout(){
    this.authService.logout();
  }
  registrarCita(){
    this.route.navigate(['/citas']);
  }
  historialMedico(){
    this.route.navigate(['/historial'])
  }
}
