import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonAvatar, IonButton, IonIcon, IonChip, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonButtons, IonAccordion, IonAccordionGroup, IonTextarea, IonModal, IonFooter, IonSelectOption, IonSelect, IonToggle, IonBackButton, IonProgressBar, IonBadge, IonInput, IonSegment, IonSegmentButton, IonDatetime, IonDatetimeButton, AlertController, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { AlertService } from 'src/app/shared/common/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { DeporteService } from 'src/app/services/deporte.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DeportePosicionUsuarioService } from 'src/app/services/deporte-posicion-usuario.service';
import { HeaderMapComponent } from 'src/app/shared/components/header-map/header-map.component';
import { LocationService } from '../../../shared/common/location.service';
import { RouterLink } from '@angular/router';
import { FormValidatorService } from 'src/app/shared/common/form-validator-service.service';
import { PreventSpacesDirective } from 'src/app/shared/common/prevent-spaces.directive';
import { OnlyNumbersDirective } from 'src/app/shared/common/only-numbers.directive';
import { FormatRutDirective } from 'src/app/shared/common/format-rut.directive.ts.directive';
import { FormatPhonePipe } from 'src/app/shared/common/format-phone.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { TipoPartidoService } from 'src/app/services/tipo-partido.service';
import { NivelHabilidadService } from 'src/app/services/nivel-habilidad.service';
import { RangoEdadService } from 'src/app/services/rango-edad.service';
import { NivelHabilidad, RangoEdad, TipoEmparejamiento, TipoPartido } from 'src/app/interfaces/partido.interface';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
  standalone: true,
  imports: [IonDatetimeButton, IonDatetime, IonSegmentButton, IonSegment, IonInput, IonBadge, IonProgressBar, IonBackButton, IonToggle, IonFooter, IonModal, IonTextarea, IonAccordionGroup, IonAccordion, IonButtons, IonNote, IonText, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonChip, IonIcon, IonButton, IonAvatar, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonInputPasswordToggle, CommonModule, RouterLink, FormsModule, ReactiveFormsModule, HeaderMapComponent, PreventSpacesDirective, OnlyNumbersDirective, FormatRutDirective, FormatPhonePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InfoUsuarioPage {
  private fb = inject(FormBuilder);
  private formValidatorService = inject(FormValidatorService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private usuarioService = inject(UsuarioService);
  private deporteService = inject(DeporteService);
  private alertController = inject(AlertController);
  private deportePosicionUsuarioService = inject(DeportePosicionUsuarioService);
  private locationService = inject(LocationService);
  private authService = inject(AuthService);
  private tipoPartidoService = inject(TipoPartidoService);
  private nivelHabilidadService = inject(NivelHabilidadService);
  private rangoEdadService = inject(RangoEdadService);

  selectedImage = signal<any>('');
  listDeportes = signal<any[]>([]);
  listPosiciones = signal<any[]>([]);
  listNivelesHabilidad = signal<NivelHabilidad[]>([]);
  listRangosEdad = signal<RangoEdad[]>([]);
  listTiposPartidos = signal<TipoPartido[]>([]);
  infoUsuario = signal<any>(null);
  idUsuario = signal<string>('');
  ubication = signal<string>('');
  editModeFormUserData = signal<boolean>(false);
  editModeFormUserPreferences = signal<boolean>(false);
  selectedSegment = signal<'perfil' | 'datos'>('datos');

  // Para verificación de permisos
  isJugador = signal<boolean>(false);
  isCancha = signal<boolean>(false);
  isAdmin = signal<boolean>(false);


  deportesPosicionesUsuariosForm = this.fb.group({
    deporte_id: ['', [Validators.required]],
    deporte_posicion_id: ['', [Validators.required]]
  });

  userDataForm = this.fb.group({
    rut: [{ value: '', disabled: true }],
    correo: [{ value: '', disabled: true }],
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
    fecha_nacimiento: ['', [Validators.required]]
  });

  changePasswordForm = this.fb.group({
    claveActual: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]],
    nuevaClave: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]],
    repeatNuevaClave: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]],
  }, {
    validators: [
      this.formValidatorService.matchValues('nuevaClave', 'repeatNuevaClave')
    ]
  });

  userPreferencesForm = this.fb.group({
    tipo_partido_id: ['', [Validators.required]],
    nivel_habilidad_id: ['', [Validators.required]],
    rango_edad_id: ['', [Validators.required]],
    distancia_cancha_max: ['', [Validators.required]],
  });

  isModalOpen = signal<boolean>(false);

  maxDate = signal<string>('');

  constructor() {
    const today = new Date();
    this.maxDate.set(today.toISOString().split('T')[0]);
  }

  async ionViewWillEnter() {
    this.ubication.set(this.locationService.getLocation().ubicacion);
    this.idUsuario.set(await this.storageService.get('user'));
    this.selectedSegment.set('perfil');
    this.getListDeportes();
    this.getListTiposPartidos();
    this.getListNivelesHabilidad();
    this.getListRangosEdad();
    this.getInfoUsuario();
    this.getRoleUser();
  }

  async getRoleUser() {
    let roleUser = await this.storageService.get('roles');
    switch(roleUser[0]) {
      case 'jugador':
        this.isJugador.set(true);
        break;
      case 'cancha':
        this.isCancha.set(true);
        break;
      case 'admin':
        this.isAdmin.set(true);
        break;
    }
  }

  getInfoUsuario() {
    this.usuarioService.getUsuario(this.idUsuario()).subscribe({
      next: (resp: responseSuccess) => {
        this.infoUsuario.set(resp.data);

        if(resp.data.imagen_perfil) {
          this.selectedImage.set(`http://localhost:3000${resp.data.imagen_perfil}`);
        }
        this.storageService.fullName.set(`${resp.data.nombre} ${resp.data.apellido}`);

        this.userPreferencesForm.patchValue({
          rango_edad_id: resp.data.rangoEdad ? resp.data.rangoEdad.id_rango_edad : '',
          nivel_habilidad_id: resp.data.nivelHabilidad ? resp.data.nivelHabilidad.id_nivel_habilidad : '',
          tipo_partido_id: resp.data.tipoPartido ? resp.data.tipoPartido.id_tipo_partido : '',
          distancia_cancha_max: resp.data.distancia_cancha_max
        })

        const fechaNacimientoISO = new Date(resp.data.fecha_nacimiento).toISOString();
        this.userDataForm.patchValue({
          rut: resp.data.rut,
          correo: resp.data.correo,
          nombre: resp.data.nombre,
          apellido: resp.data.apellido,
          telefono: resp.data.telefono,
          fecha_nacimiento: fechaNacimientoISO
        });

      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }

  getListDeportes(): void {
    this.deporteService.getAllDeportes().subscribe({
      next: (resp: responseSuccess) => {
        this.listDeportes.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  onDateChange(event: any) {
    const dateWithTime = new Date(event.detail.value);
    dateWithTime.setHours(0, 0, 0, 0);
    this.userDataForm.get('fecha_nacimiento')?.setValue(dateWithTime.toISOString());
  }

  onDeporteChange(event: any) {
    const selectedDeporteId = event.detail.value;

    // Filtra las posiciones del deporte seleccionado
    const deporteSeleccionado = this.listDeportes().find(deporte => deporte.id_deporte === selectedDeporteId);
    if (deporteSeleccionado) {
      this.listPosiciones.set(deporteSeleccionado.deportesPosiciones);
    } else {
      this.listPosiciones.set([])
    }

    // Limpiar el valor del select de posiciones
    this.deportesPosicionesUsuariosForm.get('id_posicion')?.reset();
  }

  getStarIcon(starNumber: number): string {
    const rating = this.infoUsuario().promedio_evaluacion;
    if (rating >= starNumber) {
      // Si la calificación es mayor o igual al número de la estrella, muestra una estrella completa
      return 'star';
    } else if (rating >= starNumber - 0.5) {
      // Si la calificación está entre la estrella actual y 0.5 menos, muestra una media estrella
      return 'star-half';
    } else {
      // Si la calificación es menor, muestra una estrella vacía
      return 'star-outline';
    }
  }

  setOpen(isOpen: boolean) {
    this.deportesPosicionesUsuariosForm.reset();
    this.isModalOpen.set(isOpen);
  }

  async onSubmit() {
    const fullFormDeportesPosicionesUsuarios = {
      ...this.deportesPosicionesUsuariosForm.value,
      usuario_id: await this.storageService.get('user')
    };

    this.deportePosicionUsuarioService.createDeportePosicionUsuario(fullFormDeportesPosicionesUsuarios).subscribe({
      next: (resp: responseSuccess) => {
        this.getInfoUsuario();
        this.alertService.message(resp.message);
        this.isModalOpen.set(false);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }

  async onSubmitUserPreferencesForm() {
    const alert = await this.alertController.create({
      header: 'Guardar Cambios',
      message: `¿Estás seguro de que quieres actualizar tus preferencias?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            const fullFormDataUserPreferences = {
              ...this.userPreferencesForm.value
            };

            this.usuarioService.patchUsuario(this.idUsuario(), fullFormDataUserPreferences).subscribe({
              next: (resp) => {
                this.alertService.message(resp.message);
                this.getInfoUsuario();
                this.editModeFormUserPreferences.set(false);
              },
              error: (err: responseError) => {
                this.alertService.error(err.message);
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async onSubmitUserDataForm() {
    const alert = await this.alertController.create({
      header: 'Guardar Cambios',
      message: `¿Estás seguro de que quieres actualizar tus datos personales?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            const fullFormDataUser = {
              ...this.userDataForm.value
            };

            this.usuarioService.patchUsuario(this.idUsuario(), fullFormDataUser).subscribe({
              next: (resp) => {
                this.alertService.message(resp.message);
                this.getInfoUsuario();
                this.editModeFormUserData.set(false);
              },
              error: (err: responseError) => {
                this.alertService.error(err.message);
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async onSubmitChangePasswordForm() {
    const alert = await this.alertController.create({
      header: 'Cambiar Contraseña',
      message: `¿Estás seguro de que quieres cambiar tu contraseña?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            const fullFormChangePassword = {
              userId: this.idUsuario(),
              currentPassword: this.changePasswordForm.value.claveActual,
              newPassword: this.changePasswordForm.value.nuevaClave
            };

            this.authService.changePassword(fullFormChangePassword).subscribe({
              next: (resp) => {
                this.alertService.message(resp.message);
                this.getInfoUsuario();
              },
              error: (err: responseError) => {
                this.alertService.error(err.message);
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedSegment.set(event.detail.value);
    this.changePasswordForm.reset();
    this.editModeFormUserPreferences.set(false);
    this.editModeFormUserData.set(false);
  }

  toggleEditMode(formToggle: 'userPreferences' | 'userData') {
    switch (formToggle) {
      case 'userPreferences':
        this.editModeFormUserPreferences.set(!this.editModeFormUserPreferences());
        break;
      case 'userData':
        this.editModeFormUserData.set(!this.editModeFormUserData());
        break;
    }
  }

  getListTiposPartidos(): void {
    this.tipoPartidoService.getAllTiposPartidos().subscribe({
      next: (resp: responseSuccess) => {
        this.listTiposPartidos.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListNivelesHabilidad(): void {
    this.nivelHabilidadService.getAllNivelesHabilidad().subscribe({
      next: (resp: responseSuccess) => {
        this.listNivelesHabilidad.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListRangosEdad(): void {
    this.rangoEdadService.getAllRangosEdad().subscribe({
      next: (resp: responseSuccess) => {
        this.listRangosEdad.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });

    if (image) {
      this.selectedImage.set(image.webPath);
      const blob = await fetch(image.webPath!).then(r => r.blob());
      this.uploadImage(blob);
    }
  }

  uploadImage(file: Blob) {
    this.usuarioService.uploadProfilePicture(this.idUsuario(), file).subscribe({
      next: async (response: any) => {
        this.storageService.imageUrl.set(`${response.filePath}`);
        this.selectedImage.set(`http://localhost:3000${response.filePath}`);
        await this.storageService.set('imagen_perfil', response.filePath);
        this.alertService.message('Imagen de perfil actualizada con éxito');
      },
      error: (err: any) => {
        console.error(err);
        this.alertService.error(err.message);
      }
    });
  }
}
