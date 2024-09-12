import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonMenuButton,
  IonButtons,
  IonMenu,
  IonImg,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonTabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonTabButton,
    IonList,
    IonImg,
    IonToolbar,
    IonHeader,
    IonApp,
    IonRouterOutlet,
    IonContent,
    IonTitle,
    IonMenuButton,
    IonButtons,
    IonMenu,
    IonList,
    IonItem,
    IonIcon,
    IonLabel
  ]
})
export class AppComponent {
  constructor() {
    addIcons({ home });
  }
}
