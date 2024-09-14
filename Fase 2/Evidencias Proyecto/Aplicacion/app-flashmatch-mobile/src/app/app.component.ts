import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, home, keyOutline, personOutline, shieldCheckmarkOutline } from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet
  ]
})
export class AppComponent {
  constructor() {
    addIcons({ home, personOutline, keyOutline, shieldCheckmarkOutline, cameraOutline });
  }
}
