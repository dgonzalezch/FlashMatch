import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonImg, IonContent, IonTitle, IonAvatar, IonGrid, IonCol, IonRow, IonInput, IonItem, IonList, IonText, IonHeader, IonButtons, IonToolbar, IonMenuButton, IonButton, IonCheckbox, IonLabel, IonCardContent, IonCard, IonInputPasswordToggle, IonAlert, AlertController, IonRouterOutlet, IonMenu, IonMenuToggle, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FormValidatorService } from 'src/app/shared/common/form-validator-service.service';
import { PreventSpacesDirective } from 'src/app/shared/common/prevent-spaces.directive';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { StorageService } from 'src/app/services/storage.service';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonRouterOutlet, IonAlert, IonCard, IonCardContent, IonLabel, IonCheckbox, IonButton, IonToolbar, IonButtons, IonHeader, IonText, IonList, IonItem, IonRow, IonCol, IonGrid, IonAvatar, IonTitle, IonContent, CommonModule, FormsModule, IonImg, IonInput, IonMenuButton, RouterLink, HeaderComponent, PreventSpacesDirective, FormsModule, ReactiveFormsModule, IonInputPasswordToggle, MenuComponent, IonMenu, IonMenuToggle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);

  showPassword = false;

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

  onSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: async (response) => {
        await this.storageService.set('user', response.id_usuario);
        await this.storageService.set('token', response.token);
        await this.storageService.set('nombre', response.nombre);
        await this.storageService.set('apellido', response.apellido);
        await this.storageService.set('correo', response.correo);
        await this.storageService.set('roles', response.roles);
        await this.storageService.set('ubicacion', response.ubicacion);
        await this.storageService.set('latitud', response.latitud);
        await this.storageService.set('longitud', response.longitud);
        this.router.navigate(['/private/home']);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
