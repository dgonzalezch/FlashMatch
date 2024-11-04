import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonList, IonItem, IonButtons, IonImg, IonMenu, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonText, AlertController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { StorageService } from '../services/storage.service';
import { LocationService } from '../shared/common/location.service';
import { UsuarioService } from '../services/usuario.service';
import { AlertService } from '../shared/common/alert.service';
import { responseError } from '../interfaces/response-error.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.main-page.html',
  styleUrls: ['./private.main-page.scss'],
  standalone: true,
  imports: [IonText, IonCard, IonCol, IonRow, IonGrid, IonMenu, IonMenuButton, IonImg, IonButtons, IonItem, IonList, IonRouterOutlet, IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PrivatePage {
  alertController = inject(AlertController);
  storageService = inject(StorageService);
  locationService = inject(LocationService);
  usuarioService = inject(UsuarioService);
  alertService = inject(AlertService);
  authService = inject(AuthService);
  router = inject(Router);

  menuItems = signal<any[]>([]);
  userData = signal<any>({});

  async ionViewWillEnter() {
    this.userData.set(await this.authService.getUserData());
    this.storageService.imageUrl.set((await this.authService.getUserData()).imagen_perfil)
    this.storageService.fullName.set(`${(await this.authService.getUserData()).nombre}  ${(await this.authService.getUserData()).apellido}`)
    let role = await this.storageService.get('roles');
    switch (role[0]) {
      case 'jugador':
        this.menuItems.set([
          { icon: 'home-outline', label: 'Inicio', route: '/private/home' },
          { icon: 'flash-outline', label: 'Matchmaking', route: '/private/matchmaking' },
          { icon: 'football-outline', label: 'Partidos', route: '/private/matches' },
          { icon: 'archive-outline', label: 'Invitaciones', route: '/private/invitations' },
          // { icon: 'settings-outline', label: 'Configuraciones', route: '/private/configurations' },
        ]);
        break;
      case 'cancha':
        this.menuItems.set([
          { icon: 'home-outline', label: 'Inicio', route: '/private/home' },
          { icon: 'albums-outline', label: 'Canchas', route: '/private/courts' },
          // { icon: 'people-circle-outline', label: 'Matchmaking', route: '/private/matchmaking' },
          { icon: 'archive-outline', label: 'Solicitudes', route: '/private/requests' },
          // { icon: 'reader-outline', label: 'Historial', route: '/private/teams' },
        ]);
        break;
      case 'admin':
        break;
    }

    if(!await this.storageService.get('ubicacion')) {
      const alert = await this.alertController.create({
        header: 'Ubicación',
        message: `Aún no proporcionas una ubicación. ¿Guardar tu ubicación actual?`,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Cambiar',
            role: 'cancel',
            handler: () => {
              this.router.navigate(['/private/map']);
            }
          },
          {
            text: 'Confirmar',
            handler: async () => {
              await this.locationService.loadCurrentLocation();
              this.usuarioService.patchUsuario(await this.storageService.get('user'), this.locationService.getLocation()).subscribe({
                next: async (resp) => {
                  await this.storageService.set('ubicacion', resp.data.ubicacion)
                  await this.storageService.set('latitud', resp.data.latitud)
                  await this.storageService.set('longitud', resp.data.longitud)
                  this.alertService.message(resp.message);
                },
                error: (err: responseError) => {
                  this.alertService.error(err.message);
                }
              })
            }
          }
        ]
      });

      await alert.present();
    }
  }
}
