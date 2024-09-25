import { inject, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertController = inject(AlertController)

  async error(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Cerrar']
    });

    await alert.present();
  }
}
