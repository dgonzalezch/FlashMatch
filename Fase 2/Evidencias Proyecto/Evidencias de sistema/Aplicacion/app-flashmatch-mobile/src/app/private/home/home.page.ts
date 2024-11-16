import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonIcon, IonTabButton, IonTab, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonCol, IonGrid, IonRow, IonImg, IonFooter, IonButton, IonItem, IonList, IonLabel, IonAvatar, IonText } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonText, IonAvatar, RouterLink, IonLabel, IonList, IonItem, IonButton, IonFooter, IonImg, IonRow, IonGrid, IonCol, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonTab, IonTabButton, IonIcon, IonTabBar, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomePage {
  private storageService = inject(StorageService);
  private router = inject(Router)
  menuItems = signal<any[]>([]);
  userName = signal<any>('');

  async ionViewWillEnter() {
    let role = await this.storageService.get('roles');
    this.userName.set(await this.storageService.get('nombre'));
    switch (role[0]) {
      case 'jugador':
        this.menuItems.set([
          { icon: 'flash-outline', label: 'Matchmaking', route: '/private/matchmaking', description: 'Encuentra tu match y únete a un partido de manera rápida.' },
          { icon: 'football-outline', label: 'Partidos', route: '/private/matches', description: 'Visualiza el estado y detalles de tus próximos partidos.' },
          { icon: 'archive-outline', label: 'Invitaciones', route: '/private/invitations', description: 'Consulta tus invitaciones pendientes y únete.' },
          { icon: 'person-outline', label: 'Perfil', route: '/private/profile/user-info', description: 'Administra tu perfil y ajusta tus datos personales.' },
        ]);
        break;
      case 'cancha':
        this.menuItems.set([
          { icon: 'albums-outline', label: 'Canchas', route: '/private/courts', description: 'Administra tus canchas disponibles y horarios.' },
          { icon: 'archive-outline', label: 'Solicitudes', route: '/private/requests', description: 'Consulta y gestiona las solicitudes de reserva.' },
          { icon: 'person-outline', label: 'Perfil', route: '/private/profile/user-info', description: 'Administra tu perfil y ajusta tus datos personales.' }
        ]);
        break;
      case 'admin':
        break;
    }
  }

}
