import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonAvatar, IonButton, IonIcon, IonChip, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonButtons, IonAccordion, IonAccordionGroup, IonTextarea, IonModal, IonFooter, IonSelectOption, IonSelect, IonToggle, IonBackButton, IonProgressBar, IonBadge, IonInput, IonSegment, IonSegmentButton, IonDatetime, IonDatetimeButton } from '@ionic/angular/standalone';
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

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
  standalone: true,
  imports: [IonDatetimeButton, IonDatetime, IonSegmentButton, IonSegment, IonInput, IonBadge, IonProgressBar, IonBackButton, IonToggle, IonFooter, IonModal, IonTextarea, IonAccordionGroup, IonAccordion, IonButtons, IonNote, IonText, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonChip, IonIcon, IonButton, IonAvatar, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, RouterLink, FormsModule, ReactiveFormsModule, HeaderMapComponent, PreventSpacesDirective, OnlyNumbersDirective, FormatRutDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InfoUsuarioPage {
  private fb = inject(FormBuilder);
  private formValidatorService = inject(FormValidatorService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private usuarioService = inject(UsuarioService);
  private deporteService = inject(DeporteService);
  private deportePosicionUsuarioService = inject(DeportePosicionUsuarioService);
  private locationService = inject(LocationService);

  listDeportes = signal<any[]>([]);
  listPosiciones = signal<any[]>([]);
  infoUsuario = signal<any>(null);
  idUsuario = signal<string>('');
  ubication = signal<string>('');
  selectedSegment = signal<'preferencias' | 'datos'>('datos');

  deportesPosicionesUsuariosForm = this.fb.group({
    deporte_id: ['', [Validators.required]],
    deporte_posicion_id: ['', [Validators.required]]
  });

  userDataForm = this.fb.group({
    rut: [{value: '', disabled: true}],
    correo: [{value: '', disabled: true}],
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
    fecha_nacimiento: ['', [Validators.required]]
  });

  isModalOpen = signal<boolean>(false);

  async ionViewWillEnter() {
    this.idUsuario.set(await this.storageService.get('user'));
    this.getInfoUsuario();
    this.getListDeportes();
    this.ubication.set(this.locationService.getLocation().ubicacion);
    this.selectedSegment.set('preferencias');
  }

  user = {
    titles: ['Título 1', 'Título 2'],
    rating: 4.5,
  };

  getInfoUsuario() {
    this.usuarioService.getUsuario(this.idUsuario()).subscribe({
      next: (resp: responseSuccess) => {
        this.infoUsuario.set(resp.data);
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
    const rating = this.user.rating;

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
      id_usuario: await this.storageService.get('user')
    };

    this.deportePosicionUsuarioService.createDeportePosicionUsuario(fullFormDeportesPosicionesUsuarios).subscribe({
      next: (resp: responseSuccess) => {
        this.alertService.message(resp.message);
        this.isModalOpen.set(false);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }

  async onSubmitUserDataForm() {
    const fullFormDataUser = {
      ...this.userDataForm.value
    };

    this.usuarioService.patchUsuario(this.idUsuario(), fullFormDataUser).subscribe({
      next: (resp) => {
        this.alertService.message(resp.message);
        this.getInfoUsuario();
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedSegment.set(event.detail.value);
  }
}
