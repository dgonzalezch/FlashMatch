import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  // Validador para comprobar que dos campos coinciden
  matchValues(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const control1 = control.get(field1);
      const control2 = control.get(field2);

      const value1 = control1?.value;
      const value2 = control2?.value;

      // Si alguno de los valores está vacío, no lo valida
      if (!value1 || !value2) {
        return null;
      }

      if (value1 !== value2) {
        // Aplica el error al segundo campo (por ejemplo, repeatCorreo o repeatClave)
        control2?.setErrors({ mismatch: true });
      } else {
        // Limpia los errores si los valores coinciden
        control2?.setErrors(null);
      }

      return null; // Sin errores globales en el formulario
    };
  }

  validateRUT(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;

      if (!rut) {
        return null; // Si no hay valor, no se valida (esto es opcional)
      }

      // Eliminar puntos y guiones
      const sanitizedRUT = rut.replace(/[.-]/g, '');

      // Validar longitud mínima
      if (sanitizedRUT.length < 2) {
        return { invalidRUT: true };
      }

      const body = sanitizedRUT.slice(0, -1);
      const checkDigit = sanitizedRUT.slice(-1).toUpperCase();

      // Cálculo del dígito verificador
      let sum = 0;
      let multiplier = 2;

      for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
      }

      const mod = sum % 11;
      const expectedCheckDigit = mod === 0 ? '0' : mod === 1 ? 'K' : (11 - mod).toString();

      // Comparar el dígito verificador
      if (checkDigit !== expectedCheckDigit) {
        return { invalidRUT: true };
      }

      return null; // RUT válido
    };
  }

  cleanRut(rut: string): string {
    if (!rut) return '';

    // Eliminar puntos y guion
    return rut.replace(/[.\-]/g, '');
  }
}
