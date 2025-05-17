import { Component } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  
  constructor(private route: Router){}
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
  }
}
