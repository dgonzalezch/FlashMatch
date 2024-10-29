import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonAvatar, IonButton, IonIcon, IonChip, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonNote, IonButtons, IonAccordion, IonAccordionGroup, IonTextarea, IonModal, IonFooter, IonSelectOption, IonSelect, IonToggle, IonBackButton, IonProgressBar, IonBadge } from '@ionic/angular/standalone';
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

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.page.html',
  styleUrls: ['./info-usuario.page.scss'],
  standalone: true,
  imports: [IonBadge, IonProgressBar, IonBackButton, IonToggle, IonFooter, IonModal, IonTextarea, IonAccordionGroup, IonAccordion, IonButtons, IonNote, IonText, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonChip, IonIcon, IonButton, IonAvatar, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, RouterLink, FormsModule, ReactiveFormsModule, HeaderMapComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InfoUsuarioPage {
  private fb = inject(FormBuilder);
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

  usuario = {
    id_usuario: "b9c922c8-30d9-4c87-a304-000c7d052da6",
    nombre: "Daniel",
    apellido: "González",
    rut: "20160253K",
    fecha_nacimiento: "2024-10-20",
    correo: "daj.gonzalez@duocuc.cl",
    telefono: "979834385",
    ubicacion: "O'Higgins 969, 8070993 San Bernardo, Región Metropolitana, Chile",
    latitud: "-33.5904768000000000",
    longitud: "-70.7100672000000000",
    imagen_perfil: null,
    roles: ["jugador"],
    activo: true,
    creado_en: "2024-10-21T02:26:02.889Z",
    equipos: [],
    deportesPosicionesUsuarios: [
      {
        id_deporte_posicion_usuario: "19142e49-9667-417b-8965-652af5dde491",
        deportePosicion: {
          id_deporte_posicion: "c59f38ce-a171-4c7c-83c2-898e4705b8d1",
          nombre_deporte_posicion: "Portero",
          deporte: {
            id_deporte: "006f15ae-4d9d-466c-b95d-3698950bb300",
            nombre_deporte: "Fútbol 11",
            cantidad_min_jugadores: 22,
            cantidad_max_jugadores: 44,
            descripcion: null,
            icono: "football-outline"
          }
        }
      }
    ],
    estadisticasDetalladasUsuarios: [
      {
        id_estadistica_detallada: "becc1783-926d-4220-b7f2-4be28513140e",
        parametro_valor: "90.00",
        parametroRendimiento: {
          id_parametro_rendimiento: "7f50ec97-1448-4698-bb7f-b91d6086607c",
          nombre_parametro_rendimiento: "Velocidad",
          descripcion: null
        }
      },
      {
        id_estadistica_detallada: "4f6ccf58-c4cc-4e32-a78f-665e8c0b3237",
        parametro_valor: "90.00",
        parametroRendimiento: {
          id_parametro_rendimiento: "de79f07b-0478-4a7d-b9a2-fb71dfdd7673",
          nombre_parametro_rendimiento: "Resistencia",
          descripcion: null
        }
      },
      {
        id_estadistica_detallada: "67e262ef-628b-4e95-ba41-60235dd3a3b5",
        parametro_valor: "90.00",
        parametroRendimiento: {
          id_parametro_rendimiento: "ae482a68-3c9f-4eda-9baa-84bad5f081ee",
          nombre_parametro_rendimiento: "Táctica",
          descripcion: null
        }
      },
      {
        id_estadistica_detallada: "e6c7ca62-7452-496c-a747-c25991b987d0",
        parametro_valor: "90.00",
        parametroRendimiento: {
          id_parametro_rendimiento: "76bc0fa2-c5ae-4eb1-a177-cec668e03593",
          nombre_parametro_rendimiento: "Técnica",
          descripcion: null
        }
      }
    ],
    partidos: [
      {
        id: "e99c15e5-8fda-459d-a91e-f1d845e40d6a",
        fecha: "2024-10-29T11:00:00.000Z",
        estado: "confirmado",
        deporte: {
          nombre_deporte: "Fútbol 11"
        }
      },
      {
        id: "750b0439-6ca3-45b8-9dd8-395ef555de14",
        fecha: "2024-10-15T11:00:00.000Z",
        estado: "pendiente_reserva",
        deporte: {
          nombre_deporte: "Fútbol 11"
        }
      }
    ],
    // Agregar si hay títulos y valorización del usuario
    titulos: [
      {
        nombre: "Campeón Local"
      }
    ],
    valorizacion: 4 // valor de 1 a 5, para mostrar estrellas
  };


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
    this.usuarioService.getUsuario(this.idUsuario()).subscribe({
      next: (resp: responseSuccess) => {
        this.infoUsuario.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
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
}
