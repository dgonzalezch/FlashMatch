import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonGrid, IonRow, IonCol, IonText, IonCardContent, IonIcon, IonButton, IonFooter, IonLabel, IonItem, IonList, IonToggle, IonThumbnail, IonDatetimeButton, IonModal, IonDatetime, IonAccordion, IonAccordionGroup, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSegment, IonSegmentButton, IonAlert, IonSpinner, LoadingController, IonNote, IonInfiniteScroll, IonInfiniteScrollContent, AlertController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { LocationService } from 'src/app/shared/common/location.service';

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
  loadingController = inject(LoadingController);
  router = inject(Router);
  alertController = inject(AlertController);
  locationService = inject(LocationService);

  selectedSegment = signal<string>('list');
  selectedCanchaId = signal<string>('');
  useCurrentLocationValue = signal<boolean>(false);
  selectedLocation = signal<string>('');

  // ionViewWillEnter() {
  //   if(this.locationService.getLocation().lat && this.locationService.getLocation().lng) {

  //   } else {

  //   }
  // }

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
            this.reservarCancha(cancha);
          }
        }
      ]
    });

    await alert.present();
  }

  async reservarCancha(idCancha: string) {
    const loading = await this.loadingController.create({
      message: 'Enviando solicitud de reserva...',
      duration: 3000
    });

    // Mostrar el loading modal
    await loading.present();

    // Esperar a que el modal de carga desaparezca
    await loading.onDidDismiss();

    // Redirigir a la ruta deseada
    this.router.navigate(['/private/matches/create-match/step-3']);
  }

  // Lista de canchas
  canchas: Cancha[] = [
    {
      id_cancha: '123e4567-e89b-12d3-a456-426614174000',
      nombre: 'Cancha Central',
      precio_por_hora: 20000,
      ubicacion: 'Calle Fútbol, Santiago',
      descripcion: 'Cancha amplia y bien mantenida, ideal para partidos de liga.',
      tipoCancha: 'Fútbol 11',
      imagen: 'https://example.com/cancha-central.jpg',
      latitud: -33.4489,
      longitud: -70.6693
    },
    {
      id_cancha: '456e7890-e12b-34d5-a678-426614174001',
      nombre: 'Cancha Rápida',
      precio_por_hora: 15000,
      ubicacion: 'Avenida Rápida, Santiago',
      descripcion: 'Cancha pequeña para fútbol 5, perfecta para jugar en grupos reducidos.',
      tipoCancha: 'Fútbol 5',
      imagen: 'https://example.com/cancha-rapida.jpg',
      latitud: -33.4568,
      longitud: -70.6482
    }
  ];

  onLocationToggle(event: any) {
    if (event.detail.checked) {
      this.useCurrentLocationValue.set(true);
      this.selectedLocation.set('Ubicación actual');
    } else {
      this.useCurrentLocationValue.set(false);
      this.selectedLocation.set('');
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment.set(event.detail.value);
  }
}
