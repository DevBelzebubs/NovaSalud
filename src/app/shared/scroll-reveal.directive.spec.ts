import { ScrollRevealDirective } from './scroll-reveal.directive';

describe('ScrollRevealDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as any;
    const mockRenderer2 = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeClass', 'addClass', 'listen']);
    const directive = new ScrollRevealDirective(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});
