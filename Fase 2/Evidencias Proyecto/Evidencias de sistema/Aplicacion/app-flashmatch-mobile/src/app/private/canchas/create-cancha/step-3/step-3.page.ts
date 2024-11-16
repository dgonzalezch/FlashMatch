import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonCard, IonCardContent, IonIcon, IonText, IonButtons, IonBackButton, IonButton, IonFooter, LoadingController, AlertController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../../shared/common/alert.service';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.page.html',
  styleUrls: ['./step-3.page.scss'],
  standalone: true,
  imports: [IonFooter, IonButton, IonBackButton, IonButtons, IonText, IonIcon, IonCardContent, IonCard, IonGrid, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export default class Step3Page implements OnInit {
  loadingController = inject(LoadingController);
  alertController = inject(AlertController);
  alertService = inject(AlertService);
  router = inject(Router);

  constructor() { }

  ngOnInit() {
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar creación',
      message: `¿Estás seguro de crear la cancha?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.crearCancha();
          }
        }
      ]
    });

    await alert.present();
  }

  async crearCancha() {
    const loading = await this.loadingController.create({
      message: 'Creando cancha...',
      duration: 3000
    });

    // Mostrar el loading modal
    await loading.present();

    // Esperar a que el modal de carga desaparezca
    await loading.onDidDismiss();


    this.alertService.info('¡Cancha creada!','La nueva cancha ya está disponible. Puedes verla en tu lista de canchas.');

    // Redirigir a la ruta deseada
    this.router.navigate(['/private/courts/list-courts']);
  }
}
