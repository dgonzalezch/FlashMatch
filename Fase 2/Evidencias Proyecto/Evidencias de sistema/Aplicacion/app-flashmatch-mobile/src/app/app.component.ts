import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, homeOutline, cameraOutline, keyOutline, personOutline, shieldCheckmarkOutline, logOutOutline, callOutline, mailOutline, locationOutline, settingsOutline, notificationsOutline, footballOutline, alarmOutline, fileTrayOutline, peopleOutline, peopleCircleOutline, walkOutline, albumsOutline, searchOutline, calendarOutline, locateOutline, funnelOutline, eyeOutline, contractOutline, add, createOutline, lockClosedOutline, phonePortraitOutline, statsChartOutline, timerOutline, pencilOutline, star, starOutline, trashOutline, medalOutline, starHalf, informationCircleOutline, mapOutline, navigateCircleOutline, pinOutline, navigateOutline, ticketOutline, listOutline, gridOutline, logInOutline, appsOutline, idCardOutline, personAddOutline, helpCircleOutline, helpOutline, checkmarkCircleOutline, hourglassOutline, timeOutline, warning, sparklesOutline, checkmarkDoneCircleOutline, checkmarkOutline, bookOutline, readerOutline, addCircleOutline, archiveOutline, checkmarkDoneOutline, imagesOutline, cloudUploadOutline, lockOpenOutline, barbellOutline, diceOutline, closeOutline, calendarNumberOutline, settings } from 'ionicons/icons';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  storageService = inject(StorageService);

  constructor() {
    addIcons({ home, homeOutline, personOutline, keyOutline, shieldCheckmarkOutline, cameraOutline, logOutOutline, callOutline, mailOutline, locationOutline, settingsOutline, notificationsOutline, footballOutline, alarmOutline, fileTrayOutline, peopleOutline, peopleCircleOutline, walkOutline, albumsOutline, searchOutline, calendarOutline, locateOutline, funnelOutline, eyeOutline, contractOutline, add, createOutline, lockClosedOutline, phonePortraitOutline, statsChartOutline, timerOutline, pencilOutline, star, starOutline, trashOutline, medalOutline, starHalf, informationCircleOutline, mapOutline, navigateCircleOutline, pinOutline, navigateOutline, ticketOutline, listOutline, gridOutline, logInOutline, appsOutline, idCardOutline, personAddOutline, helpCircleOutline, helpOutline, checkmarkCircleOutline, hourglassOutline, timeOutline, warning, sparklesOutline, checkmarkDoneCircleOutline, checkmarkOutline, bookOutline, readerOutline, addCircleOutline, archiveOutline, checkmarkDoneOutline, imagesOutline, cloudUploadOutline, lockOpenOutline, barbellOutline, diceOutline, closeOutline, calendarNumberOutline, settings });
  }

  async ngOnInit() {
    await this.storageService.init();
  }
}
