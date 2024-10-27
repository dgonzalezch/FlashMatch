import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonGrid, IonRow, IonCol, IonText, IonCardContent, IonIcon, IonButton, IonFooter, IonLabel, IonItem, IonList, IonToggle, IonThumbnail, IonDatetimeButton, IonModal, IonDatetime, IonAccordion, IonAccordionGroup, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSegment, IonSegmentButton, IonAlert, IonSpinner, LoadingController, IonNote, IonInfiniteScroll, IonInfiniteScrollContent, AlertController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocationService } from 'src/app/shared/common/location.service';
import { StorageService } from 'src/app/services/storage.service';
import { CanchaService } from 'src/app/services/cancha.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { ReservaCanchaService } from 'src/app/services/reserva-cancha.service';
import { PartidoService } from 'src/app/services/partido.service';

// Definición de la interfaz Cancha
interface Cancha {
  id_cancha: string;
  nombre: string;
  precio_por_hora: number;
  ubicacion: string;
  descripcion: string;
  tipoCancha: string;
  imagen: string;
  latitud: number;
  longitud: number;
}

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonNote, IonSpinner, IonAlert, IonSegmentButton, IonSegment, IonCardSubtitle, IonCardTitle, IonCardHeader, IonAccordionGroup, IonAccordion, IonDatetime, IonModal, IonDatetimeButton, IonList, IonItem, IonLabel, IonFooter, IonButton, IonIcon, IonCardContent, IonText, IonCol, IonRow, IonGrid, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonToggle, IonThumbnail, IonNote],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step2Page {
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);
  private alertService = inject(AlertService);
  private locationService = inject(LocationService);
  private storageService = inject(StorageService);
  private canchaService = inject(CanchaService);
  private partidoService = inject(PartidoService);
  private reservaCanchaService = inject(ReservaCanchaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private datePipe = inject(DatePipe);

  selectedSegment = signal<string>('list');
  selectedCanchaId = signal<string>('');
  selectedLocation = signal<string>('');
  listCanchas = signal<any[]>([]);
  partidoId = signal<any>('');
  partido = signal<any>({});

  step2FormCreatePartido = this.fb.group({
    id_cancha: ['', [
      Validators.required,
    ]],
    id_usuario_creador: ['', [
      Validators.required,
    ]]
  });


  ngOnInit() {
    this.selectedLocation.set(this.locationService.getLocation().ubicacion);

    this.route.paramMap.subscribe(params => {
      this.partidoId.set(params.get('id_partido'));
    });

    this.partidoService.getPartido(this.partidoId()).subscribe({
      next: (resp: responseSuccess) => {
        this.partido.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })

    this.loadCanchas();
  }

  // ionViewWillEnter() {
  //   this.selectedLocation.set(this.locationService.getLocation().ubicacion);
  //   this.loadCanchas();
  // }

  loadCanchas() {
    this.canchaService.getCanchas().subscribe({
      next: (resp: responseSuccess) => {
        this.listCanchas.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  async presentAlertConfirm(cancha: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar reserva',
      message: `¿Estás seguro de que deseas reservar ${cancha.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.enviarSolicitudReserva(cancha);
          }
        }
      ]
    });

    await alert.present();
  }

  async enviarSolicitudReserva(cancha: any) {
    // Validar si hay al menos un horario seleccionado
    const loading = await this.loadingController.create({
      message: 'Enviando solicitud de reserva...',
      duration: 3000
    });

    const dataSendCreateReserva = {
      cancha_id: cancha.id_cancha,
      partido_id: this.partido().id_partido,
      fecha_reserva: this.datePipe.transform(this.partido().fecha_partido, 'yyyy-MM-ddTHH:mm:ss'),
      hora_reserva: this.datePipe.transform(this.partido().fecha_partido, 'HH:mm'),
      mensaje: ''
    };
    console.log(this.partido())
    debugger
    try {
      await loading.present();

      this.reservaCanchaService.createReservaCancha(dataSendCreateReserva).subscribe({
        next: async (resp) => {
          await loading.dismiss();
          this.router.navigate(['/private/matches/create-match/step-3']);
        },
        error: async (err: responseError) => {
          await loading.dismiss();
          debugger
          this.alertService.error(err.message);
        }
      });
    } catch (error) {
      await loading.dismiss();
      this.alertService.error('Ocurrió un error inesperado al enviar la solicitud.');
    }
  }


  segmentChanged(event: any) {
    this.selectedSegment.set(event.detail.value);
  }
}
