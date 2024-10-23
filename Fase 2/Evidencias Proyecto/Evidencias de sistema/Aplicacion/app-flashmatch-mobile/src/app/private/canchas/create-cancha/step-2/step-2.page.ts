import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRow, IonGrid, IonCol, IonCard, IonCardContent, IonIcon, IonText, IonItem, IonLabel, IonButton, IonFooter, IonCheckbox, IonDatetime, IonChip, IonCardTitle, IonCardHeader, IonBadge } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
  standalone: true,
  imports: [IonBadge, IonCardHeader, IonCardTitle, IonChip, IonDatetime, IonCheckbox, IonFooter, IonButton, IonLabel, IonItem, IonIcon, IonText, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step2Page {

  // horasSemana = [
  //   { hora: '08:00', seleccionada: false },
  //   { hora: '09:00', seleccionada: false },
  //   { hora: '10:00', seleccionada: false },
  //   { hora: '11:00', seleccionada: false },
  //   { hora: '12:00', seleccionada: false },
  //   { hora: '13:00', seleccionada: false },
  //   { hora: '14:00', seleccionada: false },
  //   { hora: '15:00', seleccionada: false },
  //   { hora: '16:00', seleccionada: false },
  //   { hora: '17:00', seleccionada: false },
  //   { hora: '18:00', seleccionada: false },
  //   { hora: '19:00', seleccionada: false },
  //   { hora: '20:00', seleccionada: false },
  //   { hora: '21:00', seleccionada: false },
  //   { hora: '22:00', seleccionada: false },
  //   { hora: '23:00', seleccionada: false }
  // ]

  diasSemana = signal<any[]>([
    {
      prefijo: 'LU', nombre: 'Lunes',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      prefijo: 'MA', nombre: 'Martes',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      prefijo: 'MI', nombre: 'Miércoles',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      prefijo: 'JU', nombre: 'Jueves',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      prefijo: 'VI', nombre: 'Viernes',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      prefijo: 'SÁ', nombre: 'Sábado',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      prefijo: 'DO', nombre: 'Domingo',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    }
  ]);


  onSubmit() {

  }

  onToggleDia(index: number) {
    this.diasSemana()[index].seleccionado = !this.diasSemana()[index].seleccionado;
  }

  onToggleHora(diaIndex: number, horaIndex: number) {
    // Accede al día específico por el índice
    const dia = this.diasSemana()[diaIndex];

    // Accede a la hora específica dentro del horario de ese día
    const hora = dia.horarios[horaIndex];

    // Cambia el estado de seleccionado de esa hora
    hora.seleccionada = !hora.seleccionada;
  }
}
