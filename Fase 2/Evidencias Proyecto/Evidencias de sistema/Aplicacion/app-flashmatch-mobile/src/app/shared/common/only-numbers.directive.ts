import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent): void {
    const key = event.key;

    // Permitir solo números y teclas de control (como backspace y delete)
    if (!this.isNumber(key) && !this.isControlKey(event)) {
      event.preventDefault();
    }
  }

  private isNumber(key: string): boolean {
    return /^[0-9]$/.test(key); // Verifica si la tecla es un número
  }

  private isControlKey(event: KeyboardEvent): boolean {
    // Permitir teclas de control como Backspace, Tab, etc.
    return ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(event.key);
  }
}
