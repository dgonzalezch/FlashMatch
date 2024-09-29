import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonImg, IonContent, IonTitle, IonAvatar, IonGrid, IonCol, IonRow, IonInput, IonItem, IonList, IonText, IonHeader, IonButtons, IonToolbar, IonMenuButton, IonButton, IonCheckbox, IonLabel, IonCardContent, IonCard, IonInputPasswordToggle, IonAlert, AlertController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FormValidatorService } from 'src/app/shared/common/form-validator-service.service';
import { PreventSpacesDirective } from 'src/app/shared/common/prevent-spaces.directive';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonAlert,
    IonCard,
    IonCardContent,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonToolbar,
    IonButtons,
    IonHeader,
    IonText,
    IonList,
    IonItem,
    IonRow,
    IonCol,
    IonGrid,
    IonAvatar,
    IonTitle,
    IonContent,
    CommonModule,
    FormsModule,
    IonImg,
    IonInput,
    IonMenuButton,
    RouterLink,
    HeaderComponent,
    PreventSpacesDirective,
    FormsModule,
    ReactiveFormsModule,
    IonInputPasswordToggle
  ]
})
export default class LoginPage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);

  loginForm = this.fb.group({
    correo: ['', [
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
  });

  ngOnInit() {
  }

  onSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: async (response) => {
        await this.storageService.set('token', response.token);
        await this.storageService.set('user', response.id_usuario);
        this.router.navigate(['/private/home']);
      },
      error: (err: responseError) => {
        debugger
        this.alertService.error(err.message);
      }
    })
  }
}
