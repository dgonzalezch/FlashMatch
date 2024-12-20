import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonSearchbar, IonCol, IonCard, IonCardHeader, IonItem, IonAvatar, IonLabel, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonButton, IonFab, IonFabButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.page.html',
  styleUrls: ['./list-usuarios.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonFabButton, IonFab, IonButton, IonFooter, IonCardContent, IonCardSubtitle, IonCardTitle, IonLabel, IonAvatar, IonItem, IonCardHeader, IonCard, IonCol, IonSearchbar, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListUsuariosPage {
  private storageService = inject(StorageService);
  private alertService = inject(AlertService);
  private usuarioService = inject(UsuarioService);

  listUsuarios = signal<any[]>([]);

  ionViewWillEnter() {
    this.loadUsuarios();
  }

  // Cargar lista de usuarios
  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (resp: responseSuccess) => {
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
