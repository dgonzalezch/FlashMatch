import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, homeOutline, cameraOutline, keyOutline, personOutline, shieldCheckmarkOutline, logOutOutline, callOutline, mailOutline, locationOutline, settingsOutline, notificationsOutline, footballOutline, alarmOutline, fileTrayOutline, peopleOutline, peopleCircleOutline, walkOutline, albumsOutline, searchOutline, calendarOutline, locateOutline, funnelOutline, eyeOutline, contractOutline, add } from 'ionicons/icons';


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
    addIcons({ home, homeOutline, personOutline, keyOutline, shieldCheckmarkOutline, cameraOutline, logOutOutline, callOutline, mailOutline, locationOutline, settingsOutline, notificationsOutline, footballOutline, alarmOutline, fileTrayOutline, peopleOutline, peopleCircleOutline, walkOutline, albumsOutline, searchOutline, calendarOutline, locateOutline, funnelOutline, eyeOutline, contractOutline, add });
  }
}
