import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonItem, IonIcon, IonText, IonButton } from "@ionic/angular/standalone";
import { StorageService } from 'src/app/services/storage.service';
import { LocationService } from '../../common/location.service';

@Component({
  selector: 'app-header-map',
  templateUrl: './header-map.component.html',
  styleUrls: ['./header-map.component.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonItem, IonIcon, IonText, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMapComponent {
  storageService = inject(StorageService);
  locationService = inject(LocationService);
  ubication = input.required<string>();
}
