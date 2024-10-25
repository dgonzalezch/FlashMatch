import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonInput, IonCol, IonRow, IonGrid, IonText, IonCardContent, IonCard, IonIcon, IonCheckbox, IonCardSubtitle, IonCardTitle, IonCardHeader, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidatorService } from 'src/app/shared/common/form-validator-service.service';
import { PreventSpacesDirective } from 'src/app/shared/common/prevent-spaces.directive';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';


@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonFooter, IonCard, IonButton, IonCheckbox, IonInput, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, HeaderComponent, RouterLink, FormsModule, ReactiveFormsModule, IonInputPasswordToggle, PreventSpacesDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step2Page implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private formValidatorService = inject(FormValidatorService);
  private alertService = inject(AlertService);

  step1FormData: any;

  step2Form = this.fb.group({
    correo: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(25),
    ]],
    repeatCorreo: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(25),
    ]],
    clave: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]],
    repeatClave: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]],
  }, {
    validators: [
      this.formValidatorService.matchValues('correo', 'repeatCorreo'),
      this.formValidatorService.matchValues('clave', 'repeatClave')
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
    const fullFormDataRegister = {
      ...this.step1FormData,
      correo: this.step2Form.get('correo')?.value,
      clave: this.step2Form.get('clave')?.value
    };

    this.authService.registerUser(fullFormDataRegister).subscribe({
      next: (resp) => {
        this.alertService.message(resp.message);
        this.router.navigate(['/private/home']);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }
}
