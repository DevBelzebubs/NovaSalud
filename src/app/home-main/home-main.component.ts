import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { AboutUsComponent } from "../about-us/about-us.component";

@Component({
  selector: 'app-home-main',
  imports: [TopBarComponent, AboutUsComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {
  img = ['assets/img/img1.jpg', 'assets/img/img2.jpg', 'assets/img/img3.jpg', 'assets/img/img4.jpg'];
  imgIndex = 0;
  slideWith = 1911;
  get transformStyle(){
    return `translateX(-${this.imgIndex * this.slideWith}px)`;
  }
  private checkscreeSize(){
    if(window.innerWidth < 1024){
      this.slideWith = 1750;
    }
    if(window.innerWidth < 841){
      this.slideWith = 1100;
    }
    if(window.innerWidth < 700){
      this.slideWith = 850;
    }
    if(window.innerWidth < 620){
      this.slideWith = 600;
    }
  }
  ngOnInit() {
    setInterval(() => {
      this.checkscreeSize();
      this.imgIndex = (this.imgIndex + 1) % this.img.length;
    }, 5000);
  }
}
