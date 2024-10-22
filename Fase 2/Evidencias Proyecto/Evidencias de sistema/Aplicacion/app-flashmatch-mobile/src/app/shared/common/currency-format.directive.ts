import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[currencyFormat]',
  standalone: true
})
export class CurrencyFormatDirective {

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const input = this.el;
    const inputValue = input.value;

    // Obtener la posición inicial del cursor antes del cambio de valor
    const cursorPosition = input.selectionStart;

    // Eliminar cualquier carácter no numérico (excepto el punto decimal)
    const cleanValue = inputValue.replace(/[^\d]/g, '');

    // Convertir a número y aplicar el formato de moneda
    const parsedValue = parseFloat(cleanValue);

    if (!isNaN(parsedValue)) {
      const formattedValue = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
      }).format(parsedValue);

      // Actualizar el valor del input con el formato de moneda
      input.value = formattedValue;
    } else {
      input.value = '';
    }
  }
}
