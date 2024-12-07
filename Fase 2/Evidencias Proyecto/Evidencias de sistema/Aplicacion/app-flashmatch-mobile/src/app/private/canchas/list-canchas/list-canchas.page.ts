import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonSearchbar, IonTitle, IonToolbar, IonItem, IonLabel, IonIcon, IonText, IonFooter, IonButtons, IonButton, IonImg, IonFabButton, IonFab, IonBackButton } from '@ionic/angular/standalone';
import { CanchaService } from 'src/app/services/cancha.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle'
import { environment } from 'src/environments/environment';

register()
@Component({
  selector: 'app-list-canchas',
  templateUrl: './list-canchas.page.html',
  styleUrls: ['./list-canchas.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonFab, IonFabButton, IonImg, IonButton, IonButtons, IonFooter, IonText, IonIcon, IonLabel, IonItem, IonSearchbar, IonCol, IonGrid, IonRow, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, CommonModule, FormsModule, HeaderComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class ListCanchasPage {
  private storageService = inject(StorageService);
  private alertService = inject(AlertService);
  private canchaService = inject(CanchaService);

  urlHost = signal<any>('');
  listCanchas = signal<any[]>([]);

  ionViewWillEnter() {
    this.urlHost.set(environment.hostUrl)
    this.loadCanchas();
  }

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
}
