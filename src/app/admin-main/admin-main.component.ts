import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  imports: [TopBarComponent],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {
  constructor(private route:Router){}
  doctorRegister(){
    this.route.navigate(['/registrar-doctor']);
  }
  recepcionistRegister(){
    this.route.navigate(['/registrar-recepcionista']);
  }
}
