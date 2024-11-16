import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonGrid, IonButton, IonIcon, IonAvatar, IonChip, IonLabel, IonList, IonItem, IonFooter, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonRange, IonAccordion, IonBadge, IonAccordionGroup, IonText, IonTabs, IonTabBar, IonTabButton, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.layout-page.html',
  styleUrls: ['./perfil.layout-page.scss'],
  standalone: true,
  imports: [IonSegmentButton, IonSegment, IonTabButton, IonTabBar, IonTabs, IonText, IonAccordionGroup, IonBadge, IonAccordion, IonRange, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFooter, IonItem, IonList, IonLabel, IonChip, IonAvatar, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PerfilPage {

  private storageService = inject(StorageService);
  // Para verificación de permisos
  isJugador = signal<boolean>(false);
  isCancha = signal<boolean>(false);
  isAdmin = signal<boolean>(false);

  ionViewWillEnter() {
    this.getRoleUser();
  }

  async getRoleUser() {
    let roleUser = await this.storageService.get('roles');
    switch(roleUser[0]) {
      case 'jugador':
        this.isJugador.set(true);
        break;
      case 'cancha':
        this.isCancha.set(true);
        break;
      case 'admin':
        this.isAdmin.set(true);
        break;
    }
  }
}
