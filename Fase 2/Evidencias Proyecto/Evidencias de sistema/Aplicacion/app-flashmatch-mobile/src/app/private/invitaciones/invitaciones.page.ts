import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonModal, IonButton, IonButtons, IonLabel, IonItem, IonAvatar, IonList, IonCard, IonChip, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { PartidoService } from 'src/app/services/partido.service';

@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.page.html',
  styleUrls: ['./invitaciones.page.scss'],
  standalone: true,
  imports: [IonBadge, IonIcon, IonChip, IonCard, IonList, IonAvatar, IonItem, IonLabel, IonButtons, IonButton, IonModal, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InvitacionesPage {
  private storageService = inject(StorageService);
  private alertService = inject(AlertService);
  private invitacionesService = inject(PartidoService);

  invitaciones = signal<any[]>([]); // Lista de invitaciones
  isDetallePartidoOpen = signal<boolean>(false);
  detallePartido = signal<any>(null); // Partido en detalle

  aceptarInvitacion(id: string) {
    // Lógica para aceptar la invitación
    console.log('Aceptar invitación', id);
  }

  rechazarInvitacion(id: string) {
    // Lógica para rechazar la invitación
    console.log('Rechazar invitación', id);
  }
}
