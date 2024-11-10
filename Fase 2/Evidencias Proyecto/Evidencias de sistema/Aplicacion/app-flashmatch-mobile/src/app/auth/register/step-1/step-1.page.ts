import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInput, IonCheckbox, IonButton, IonCard, IonFooter, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonText, IonNavLink, IonModal, IonDatetime, IonDatetimeButton, IonLabel, IonItem, IonList, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { PreventSpacesDirective } from 'src/app/shared/common/prevent-spaces.directive';
import { FormatRutDirective } from 'src/app/shared/common/format-rut.directive.ts.directive';
import { FormValidatorService } from 'src/app/shared/common/form-validator-service.service';
import { OnlyNumbersDirective } from 'src/app/shared/common/only-numbers.directive';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.page.html',
  styleUrls: ['./step-1.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonList, IonItem, IonLabel, IonDatetimeButton, IonDatetime, IonModal, IonNavLink, IonText, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonFooter, IonCard, IonButton, IonCheckbox, IonInput, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, HeaderComponent, RouterLink, FormatRutDirective, OnlyNumbersDirective, CommonModule, FormsModule, ReactiveFormsModule, PreventSpacesDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step1Page {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formValidatorService = inject(FormValidatorService);

  step1Form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    rut: ['', [
      Validators.required,
      this.formValidatorService.validateRUT()
    ]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
    fecha_nacimiento: ['', [Validators.required]]
  });

  maxDate = signal<string>('');

  constructor() {
    const today = new Date();
    this.maxDate.set(today.toISOString().split('T')[0]);
  }

  onDateChange(event: any) {
    const dateWithTime = new Date(event.detail.value);
    dateWithTime.setHours(0, 0, 0, 0);
    this.step1Form.get('fecha_nacimiento')?.setValue(dateWithTime.toISOString());
  }

  onSubmit() {
    // Limpiar el RUT
    const cleanedRut = this.formValidatorService.cleanRut(this.step1Form.value.rut!);

    // Actualizar el valor del formulario con el RUT limpio
    this.step1Form.patchValue({ rut: cleanedRut });
    this.router.navigate(['/auth/register/step-2'], {
      state: { step1FormData: this.step1Form.value }
    });
  }
}
