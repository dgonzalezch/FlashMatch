import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonInput, IonCol, IonRow, IonGrid, IonText, IonCardContent, IonCard, IonIcon, IonCheckbox, IonCardSubtitle, IonCardTitle, IonCardHeader, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonFooter, IonCard, IonButton, IonCheckbox, IonInput, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, RouterLink, ReactiveFormsModule, IonInputPasswordToggle],
})
export default class Step2Page implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  step1FormData: any;

  step2Form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    repeatCorreo: ['', [Validators.required, Validators.email]],
    clave: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]*$'),
    ]],
    repeatClave: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]*$'),
    ]],
  }, {
    validators: [
      matchValues('correo', 'repeatCorreo'),
      matchValues('clave', 'repeatClave')
    ]
  });

  ngOnInit() {
    // Obtener los datos del formulario de step-1
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.step1FormData = navigation.extras.state['step1FormData'];
    }
  }

  onSubmit() {
    if (this.step2Form.valid) {
      const fullFormDataRegister = {
        ...this.step1FormData,
        correo: this.step2Form.get('correo')?.value,
        clave: this.step2Form.get('clave')?.value
      };

      this.registerUser(fullFormDataRegister);
    } else {
      console.log('Formulario inválido en step-2');
    }
  }

  private registerUser(formData: any) {
    this.authService.registerUser(formData)
      .pipe(
        switchMap(() => {
          this.router.navigate(['/home']);
          return [];
        }),
        catchError(error => {
          console.error('Error durante el registro', error);
          return throwError(() => new Error(error.message));
        })
      )
      .subscribe();
  }
}

// Validador para comprobar que dos campos coinciden
export function matchValues(field1: string, field2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value1 = control.get(field1)?.value;
    const value2 = control.get(field2)?.value;

    if (value1 && value2) {
      if (value1 !== value2) {
        if (field1 === 'correo' && field2 === 'repeatCorreo') {
          return { emailMismatch: true };
        }
        if (field1 === 'clave' && field2 === 'repeatClave') {
          return { passwordMismatch: true };
        }
      }
    }
    return null; // Sin errores
  };
}

