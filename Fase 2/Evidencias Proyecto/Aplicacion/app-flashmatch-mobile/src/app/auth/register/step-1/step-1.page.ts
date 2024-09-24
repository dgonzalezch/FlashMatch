import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInput, IonCheckbox, IonButton, IonCard, IonFooter, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonText, IonNavLink } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.page.html',
  styleUrls: ['./step-1.page.scss'],
  standalone: true,
  imports: [IonNavLink, IonText, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonFooter, IonCard, IonButton, IonCheckbox, IonInput, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, RouterLink, ReactiveFormsModule]
})
export default class Step1Page implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);  // Inyecta el Router

  step1Form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]]
  });

  ngOnInit() { }

  onSubmit() {
    this.router.navigate(['/auth/register/step-2'], {
      state: { step1FormData: this.step1Form.value }
    });
  }

}

export class CustomValidators {
  static phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;  // Ejemplo de regex internacional
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidPhoneNumber: true };
  }
}
