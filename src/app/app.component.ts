import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from "./top-bar/top-bar.component";
import { HomeMainComponent } from "./home-main/home-main.component";
import { AboutUsComponent } from "./about-us/about-us.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, HomeMainComponent, AboutUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NovaSalud';
}
