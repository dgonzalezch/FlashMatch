import { Component, inject, OnInit } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, homeOutline, cameraOutline, keyOutline, personOutline, shieldCheckmarkOutline, logOutOutline, callOutline, mailOutline, locationOutline, settingsOutline, notificationsOutline, footballOutline, alarmOutline, fileTrayOutline, peopleOutline, peopleCircleOutline, walkOutline, albumsOutline, searchOutline, calendarOutline, locateOutline, funnelOutline, eyeOutline, contractOutline, add, createOutline } from 'ionicons/icons';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
  ]
})
export class AppComponent implements OnInit {
  storageService = inject(StorageService);


  constructor(storageService: StorageService) {
    addIcons({ home, homeOutline, personOutline, keyOutline, shieldCheckmarkOutline, cameraOutline, logOutOutline, callOutline, mailOutline, locationOutline, settingsOutline, notificationsOutline, footballOutline, alarmOutline, fileTrayOutline, peopleOutline, peopleCircleOutline, walkOutline, albumsOutline, searchOutline, calendarOutline, locateOutline, funnelOutline, eyeOutline, contractOutline, add, createOutline });
  }

  async ngOnInit() {
    await this.storageService.init();
  }
}
