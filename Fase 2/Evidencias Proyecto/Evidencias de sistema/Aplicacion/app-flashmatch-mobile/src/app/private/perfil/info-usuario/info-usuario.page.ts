import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonAvatar, IonButton, IonIcon, IonChip, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonButtons, IonAccordion, IonAccordionGroup, IonTextarea, IonModal, IonFooter, IonSelectOption, IonSelect, IonToggle } from '@ionic/angular/standalone';
import { AlertService } from 'src/app/shared/common/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { DeportesService } from 'src/app/services/deportes.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DeportesPosicionesUsuariosService } from 'src/app/services/deportes-posiciones-usuarios.service';
import { HeaderMapComponent } from 'src/app/shared/components/header-map/header-map.component';
import { LocationService } from '../../../shared/common/location.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
  standalone: true,
  imports: [IonToggle, IonFooter, IonModal, IonTextarea, IonAccordionGroup, IonAccordion, IonButtons, IonNote, IonText, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonChip, IonIcon, IonButton, IonAvatar, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule, HeaderMapComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InfoUsuarioPage {
  private fb = inject(FormBuilder);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private usuariosService = inject(UsuariosService);
  private deportesService = inject(DeportesService);
  private deportesPosicionesUsuariosService = inject(DeportesPosicionesUsuariosService);
  private locationService = inject(LocationService);

  listDeportes = signal<any[]>([]);
  listPosiciones = signal<any[]>([]);
  infoUsuario = signal<any>(null);
  idUsuario = signal<string>('');
  ubication = signal<string>('');

  deportesPosicionesUsuariosForm = this.fb.group({
    deporte_id: ['', [Validators.required]],
    deporte_posicion_id: ['', [Validators.required]]
  });

  isModalOpen = signal<boolean>(false);
   async ionViewWillEnter() {
    this.idUsuario.set(await this.storageService.get('user'));
    this.getInfoUsuario();
    this.getListDeportes();
    this.ubication.set(this.locationService.getLocation().ubicacion);
  }

  user = {
    titles: ['Título 1', 'Título 2'],
    rating: 4.5,
  };

  getInfoUsuario() {
    this.usuariosService.getUsuario(this.idUsuario()).subscribe({
      next: (resp: responseSuccess) => {
        debugger
        this.infoUsuario.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListDeportes(): void {
    this.deportesService.getAllDeportes().subscribe({
      next: (resp: responseSuccess) => {
        this.listDeportes.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
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

    this.deportesPosicionesUsuariosService.createDeportePosicionUsuario(fullFormDeportesPosicionesUsuarios).subscribe({
      next: (resp: responseSuccess) => {
        this.alertService.message(resp.message);
        this.isModalOpen.set(false);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }
}
