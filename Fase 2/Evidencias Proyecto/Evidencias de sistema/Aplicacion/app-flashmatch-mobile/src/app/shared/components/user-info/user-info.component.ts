import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { IonRow, IonCol, IonAvatar, IonButton, IonIcon, IonGrid, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonList, IonListHeader, IonItem, IonCard, IonBadge, IonThumbnail, IonChip } from "@ionic/angular/standalone";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [IonChip, IonBadge, IonCard, IonItem, IonListHeader, IonList, IonLabel, IonSegmentButton, IonSegment, IonToolbar, IonHeader, IonGrid, IonIcon, IonButton, IonAvatar, IonCol, IonRow, IonThumbnail, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {

  usuarioData = input.required<any>();
  selectedSegment = signal<'info' | 'historial'>('info');

  matchesHistory = [
    {
      opponentName: 'Carlos Pérez',
      date: new Date(),
      location: 'Cancha Central',
      opponentAvatar: 'https://i.pravatar.cc/300?u=a',
      result: 'Ganado'
    },
    {
      opponentName: 'María González',
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      location: 'Parque Norte',
      opponentAvatar: 'https://i.pravatar.cc/300?u=b',
      result: 'Perdido'
    },
    {
      opponentName: 'Juan Herrera',
      date: new Date(new Date().setDate(new Date().getDate() - 7)),
      location: 'Centro Deportivo',
      opponentAvatar: '',
      result: 'Empate'
    }
  ];

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
    this.selectedSegment.set('info');
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedSegment.set(event.detail.value);
  }
}
