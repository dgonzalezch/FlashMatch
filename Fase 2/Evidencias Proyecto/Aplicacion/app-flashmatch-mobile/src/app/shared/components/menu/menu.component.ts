import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonLabel, IonMenu, IonButton, IonMenuToggle, IonFooter, IonListHeader, IonCardHeader, IonCard } from "@ionic/angular/standalone";
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonListHeader, IonFooter, IonButton, IonLabel, IonIcon, IonImg, IonCol, IonRow, IonGrid, IonTitle, IonToolbar, IonHeader, IonMenu, IonContent, IonList, IonItem, IonMenuToggle, RouterLink]
})
export class MenuComponent implements OnInit {
  private storageService = inject(StorageService);
  private router = inject(Router);

  menuItems = signal([
    { icon: 'home-outline', label: 'Inicio', route: '/private/home' },
    { icon: 'football-outline', label: 'Partidos', route: '/private/matches' },
    { icon: 'albums-outline', label: 'Canchas', route: '/private/courts' },
    { icon: 'people-circle-outline', label: 'Equipos', route: '/private/teams' },
    { icon: 'walk-outline', label: 'Jugadores', route: '/private/players' },
    { icon: 'person-outline', label: 'Perfil', route: '/private/profile' },
    { icon: 'settings-outline', label: 'Configuraciones', route: '/private/configurations' },
    // { icon: 'log-out-outline', label: 'Cerrar sesión', route: '/auth' },
    // { icon: 'help-circle-outline', label: 'Ayuda', route: '/help' }
  ]);

  ngOnInit() { }

  async logOut() {
    await this.storageService.remove('token');
    await this.storageService.remove('user');
    this.router.navigate(['/auth']);
  }
}
