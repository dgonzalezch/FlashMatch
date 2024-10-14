import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[formatRut]',
  standalone: true
})
export class FormatRutDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    let value = input.value.replace(/[^0-9kK]/g, ''); // Permitir solo números y 'k' o 'K'

    // Si el valor está vacío, no hacer nada
    if (!value) {
      input.value = '';
      return;
    }

    // Separar el cuerpo y el dígito verificador
    let dv = value.slice(-1).toUpperCase(); // Último carácter como dígito verificador
    let body = value.slice(0, -1); // Todos los caracteres menos el último

    // Formatear el cuerpo con puntos cada 3 dígitos
    body = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Si el dígito verificador no es un número (k o K), eliminarlo
    if (!/^[0-9kK]$/.test(dv)) {
      dv = '';
    }

    // Componer el RUT formateado
    input.value = dv ? `${body}-${dv}` : body; // Si hay dígito verificador, agregarlo
  }
}
