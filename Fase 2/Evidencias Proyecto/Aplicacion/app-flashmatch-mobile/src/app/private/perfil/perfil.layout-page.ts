import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonGrid, IonButton, IonIcon, IonAvatar, IonChip, IonLabel, IonList, IonItem, IonFooter, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonRange, IonAccordion, IonBadge, IonAccordionGroup, IonText, IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.layout-page.html',
  styleUrls: ['./perfil.layout-page.scss'],
  standalone: true,
  imports: [IonTabButton, IonTabBar, IonTabs, IonText, IonAccordionGroup, IonBadge, IonAccordion, IonRange, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFooter, IonItem, IonList, IonLabel, IonChip, IonAvatar, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PerfilPage {

}
