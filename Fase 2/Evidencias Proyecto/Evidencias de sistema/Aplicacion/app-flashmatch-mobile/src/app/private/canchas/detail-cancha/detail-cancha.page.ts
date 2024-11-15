import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonGrid, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonBackButton } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { CanchaService } from 'src/app/services/cancha.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { ActivatedRoute } from '@angular/router';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { register } from 'swiper/element/bundle'

register()
@Component({
  selector: 'app-detail-cancha',
  templateUrl: './detail-cancha.page.html',
  styleUrls: ['./detail-cancha.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardSubtitle, IonCardContent, IonCardHeader, IonCard, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class DetailCanchaPage {
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private canchaService = inject(CanchaService);

  usuarioId = signal<any>('');
  canchaId = signal<any>('');
  datosCancha = signal<any>({})
  isImageUploadPressed = signal<boolean>(false);

  async ionViewWillEnter () {
    this.usuarioId.set(await this.storageService.get('user'));
    this.route.paramMap.subscribe(params => {
      this.canchaId.set(params.get('id_cancha'));
    });

    this.getDatosCancha()
  }

  getDatosCancha() {
    this.canchaService.getCancha(this.canchaId()).subscribe({
      next: (resp: responseSuccess) => {
        this.datosCancha.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  OnUploadImagesToggle() {
    this.isImageUploadPressed.set(!this.isImageUploadPressed());
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });

    if (image) {
      const blob = await fetch(image.webPath!).then(r => r.blob());
      this.uploadImageCancha(blob);
    }
  }

  uploadImageCancha(file: Blob) {
    this.canchaService.uploadImageCancha(this.canchaId(), file).subscribe({
      next: async (response: any) => {
        this.alertService.message('Imágen añadida con éxito.');
        this.getDatosCancha();
      },
      error: (err: any) => {
        console.error(err);
        this.alertService.error(err.message);
      }
    });
  }

  deleteImage(idImagen: string) {
    this.canchaService.deleteImagenCancha(idImagen).subscribe({
      next: async (response: any) => {
        this.alertService.message('Imágen eliminada con éxito.');
        this.getDatosCancha();
      },
      error: (err: any) => {
        console.error(err);
        this.alertService.error(err.message);
      }
    });
  }
}
