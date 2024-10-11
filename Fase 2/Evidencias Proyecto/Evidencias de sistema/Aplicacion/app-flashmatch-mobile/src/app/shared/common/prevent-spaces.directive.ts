import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventSpaces]',
  standalone: true
})
export class PreventSpacesDirective {
  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      event.preventDefault(); // Evita la introducción de espacios
    }
  }
}
