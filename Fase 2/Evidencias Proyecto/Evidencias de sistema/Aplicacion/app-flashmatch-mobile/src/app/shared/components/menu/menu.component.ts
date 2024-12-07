import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonContent, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonLabel, IonMenu, IonButton, IonMenuToggle, IonFooter, IonListHeader, IonCardHeader, IonCard, IonText, IonAvatar, IonCardContent } from "@ionic/angular/standalone";
import { StorageService } from 'src/app/services/storage.service';
import { LocationService } from '../../common/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonCardContent, IonAvatar, IonText, IonCard, IonCardHeader, IonListHeader, IonFooter, IonButton, IonLabel, IonIcon, IonImg, IonCol, IonRow, IonGrid, IonTitle, IonToolbar, IonHeader, IonMenu, IonContent, IonList, IonItem, IonMenuToggle, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  public storageService = inject(StorageService);
  private locationService = inject(LocationService);
  private router = inject(Router);

  menuItems = input.required<any[]>();
  userData = input.required<any>({});
  urlHost = signal<any>('');

  ionViewWillEnter() {
    this.urlHost.set(environment.hostUrl);
  }

  async logOut() {
    await this.storageService.clear();
    this.locationService.address.set('');
    this.locationService.lat.set(0);
    this.locationService.lng.set(0);

    // Navegar a la misma ruta, forzando la recarga del componente
    await this.router.navigateByUrl('/auth', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/auth']);
    });
  }
}
