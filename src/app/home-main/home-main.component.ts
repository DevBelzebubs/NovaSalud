import { Component, HostListener, ViewChild } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { AboutUsComponent } from "../about-us/about-us.component";
import { SpecialitiesComponent } from "../specialities/specialities.component";
import { BottomMainComponent } from "../bottom-main/bottom-main.component";
import { ElementRef } from "@angular/core";
@Component({
  selector: 'app-home-main',
  imports: [TopBarComponent, AboutUsComponent, SpecialitiesComponent, BottomMainComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {
  img = ['assets/img/img1.jpg', 'assets/img/img2.jpg', 'assets/img/img3.jpg', 'assets/img/img4.jpg'];
  imgIndex = 0;
  slideWidth = 0;
  @ViewChild('imgItem',{static:false}) imgItem!: ElementRef<HTMLImageElement>;

get transformStyle(): string {
  return `translateX(-${this.imgIndex * this.slideWidth}px)`;
}

ngOnInit(): void {
  setInterval(() => {
    this.imgIndex = (this.imgIndex + 1) % this.img.length;
  }, 5000);
}
ngAfterViewInit(): void {
  this.updateSlideWidth();
}
@HostListener('window:resize', [])
  updateSlideWidth(): void {
    if (this.imgItem?.nativeElement) {
      this.slideWidth = this.imgItem.nativeElement.offsetWidth;
    }
  }
}
