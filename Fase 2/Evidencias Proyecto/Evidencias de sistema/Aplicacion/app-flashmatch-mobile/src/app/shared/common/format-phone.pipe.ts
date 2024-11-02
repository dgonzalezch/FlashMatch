import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
  standalone: true
})
export class FormatPhonePipe implements PipeTransform {
  transform(phoneNumber: string): string {
    if (!phoneNumber) return '';

    // Remover cualquier prefijo '+56' duplicado y espacios adicionales
    const telefono = phoneNumber.replace(/^\+56\s?/, '').trim();

    // Formatear el número como "9 7983 4385"
    return `+56 ${telefono.slice(0, 1)} ${telefono.slice(1, 5)} ${telefono.slice(5)}`;
  }
}
