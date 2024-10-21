import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonSearchbar, IonTitle, IonToolbar, IonItem, IonLabel, IonIcon, IonText, IonFooter, IonButtons, IonButton, IonImg, IonFabButton, IonFab } from '@ionic/angular/standalone';
import { CanchasService } from 'src/app/services/canchas.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-list-canchas',
  templateUrl: './list-canchas.page.html',
  styleUrls: ['./list-canchas.page.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonImg, IonButton, IonButtons, IonFooter, IonText, IonIcon, IonLabel, IonItem, IonSearchbar, IonCol, IonGrid, IonRow, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListCanchasPage {
  private storageService = inject(StorageService);
  private alertService = inject(AlertService);
  private canchasService = inject(CanchasService);

  listCanchas = signal<any[]>([]);

  ionViewWillEnter() {
    this.loadCanchas();
  }

  loadCanchas() {
    this.canchasService.getCanchas().subscribe({
      next: (resp: responseSuccess) => {
        this.listCanchas.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }
}
