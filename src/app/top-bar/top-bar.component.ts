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
  rol: string | null = null;
  constructor(private route: Router, private authService:AuthService){}
  ngOnInit() {
    const usu = this.authService.getUserData()
        if(usu){
      this.username = usu.nombre
    }
    this.authService.loadUserData();
     this.rol = this.authService.getRole();
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
    this.route.navigate(['/']);
    setTimeout(() => {
      document.getElementById(path)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
  adminDashboard(){
    this.route.navigate(['/admin']);
  }
  doctorDashboard(){
    this.route.navigate(['/medico']);
  
  }
  recepcionistaDashboard(){
    this.route.navigate(['/recepcionista']);
  }
}
