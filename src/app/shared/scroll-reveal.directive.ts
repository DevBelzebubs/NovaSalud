import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective {

  constructor(private el:ElementRef, private renderer:Renderer2){}
  ngAfterViewInit() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'show');
          obs.unobserve(this.el.nativeElement);
        }
      });
    },{
      threshold: 0.1
    });
    obs.observe(this.el.nativeElement);
  }

}
