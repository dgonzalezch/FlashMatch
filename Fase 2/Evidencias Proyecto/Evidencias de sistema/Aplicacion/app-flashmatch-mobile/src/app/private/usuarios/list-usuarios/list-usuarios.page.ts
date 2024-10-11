import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonSearchbar, IonCol, IonCard, IonCardHeader, IonItem, IonAvatar, IonLabel, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonButton, IonFab, IonFabButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.page.html',
  styleUrls: ['./list-usuarios.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonFabButton, IonFab, IonButton, IonFooter, IonCardContent, IonCardSubtitle, IonCardTitle, IonLabel, IonAvatar, IonItem, IonCardHeader, IonCard, IonCol, IonSearchbar, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent, MapComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListUsuariosPage {
  private storageService = inject(StorageService);
  private alertService = inject(AlertService);
  private usuariosService = inject(UsuariosService);

  listUsuarios = signal<any[]>([]);

  // listUsuarios = [
  //   {
  //     id_usuario: 1,
  //     nombre: 'Juan Pérez',
  //     avatar: '', // Si no tiene avatar, se mostrará el avatar por defecto
  //     ciudad: 'Santiago',
  //     partidos_jugados: 15,
  //     ranking: 1200,
  //     posicion: 'Delantero'
  //   },
  //   {
  //     id_usuario: 2,
  //     nombre: 'Ana Martínez',
  //     avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  //     ciudad: 'Concepción',
  //     partidos_jugados: 20,
  //     ranking: 1500,
  //     posicion: 'Portera'
  //   },
  //   {
  //     id_usuario: 3,
  //     nombre: 'Carlos Gómez',
  //     avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  //     ciudad: 'Valparaíso',
  //     partidos_jugados: 10,
  //     ranking: 1100,
  //     posicion: 'Defensa'
  //   },
  //   {
  //     id_usuario: 4,
  //     nombre: 'María Fernández',
  //     avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
  //     ciudad: 'La Serena',
  //     partidos_jugados: 25,
  //     ranking: 1600,
  //     posicion: 'Centrocampista'
  //   }
  // ];

  ionViewWillEnter() {
    this.loadUsuarios();
  }

  // Cargar lista de usuarios
  loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (resp: responseSuccess) => {
        debugger
        this.listUsuarios.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  filterUsuarios(event: any) {

  }

  viewUserDetails(id_usuario: number) {
    console.log('Ver detalles de usuario con ID:', id_usuario);
  }

  invitarUsuario(id_usuario: number) {
    console.log('Invitar al usuario con ID:', id_usuario);
  }
}
