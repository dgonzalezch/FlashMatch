import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { IonRow, IonCol, IonAvatar, IonButton, IonIcon, IonGrid, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonList, IonListHeader, IonItem, IonCard, IonBadge, IonThumbnail, IonChip } from "@ionic/angular/standalone";
import { responseError } from 'src/app/interfaces/response-error.interface';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertService } from '../../common/alert.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [IonChip, IonBadge, IonCard, IonItem, IonListHeader, IonList, IonLabel, IonSegmentButton, IonSegment, IonToolbar, IonHeader, IonGrid, IonIcon, IonButton, IonAvatar, IonCol, IonRow, IonThumbnail, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private alertService = inject(AlertService);

  idUsuario = input.required<any>();
  usuarioData = signal<any>({});
  selectedSegment = signal<'info' | 'historial'>('info');
  partidosFinalizados = signal<any[]>([]);

  getStarIcon(starNumber: number): string {
    const rating = this.usuarioData().promedio_evaluacion;
    if (rating >= starNumber) {
      // Si la calificación es mayor o igual al número de la estrella, muestra una estrella completa
      return 'star';
    } else if (rating >= starNumber - 0.5) {
      // Si la calificación está entre la estrella actual y 0.5 menos, muestra una media estrella
      return 'star-half';
    } else {
      // Si la calificación es menor, muestra una estrella vacía
      return 'star-outline';
    }
  }

  ngOnInit() {
    this.usuarioService.getUsuario(this.idUsuario()).subscribe({
      next: (resp: responseSuccess) => {
        this.usuarioData.set(resp.data);
        this.selectedSegment.set('info');
        this.filtrarPartidosFinalizados();
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedSegment.set(event.detail.value);
  }

  filtrarPartidosFinalizados() {
    const finalizados = this.usuarioData().partidos.filter(
      (partidoUsuario: any) => partidoUsuario.partido.estado === 'finalizado'
    );
    this.partidosFinalizados.set(finalizados);
  }
}
