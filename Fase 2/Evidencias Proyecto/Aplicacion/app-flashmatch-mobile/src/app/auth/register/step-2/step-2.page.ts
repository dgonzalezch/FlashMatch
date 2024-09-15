import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonInput, IonCol, IonRow, IonGrid, IonText, IonCardContent, IonCard, IonIcon, IonCheckbox, IonCardSubtitle, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonFooter, IonCard, IonButton, IonCheckbox, IonInput, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, RouterLink, ReactiveFormsModule],
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
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
    ]],
    repeatClave: ['', [Validators.required]]
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
