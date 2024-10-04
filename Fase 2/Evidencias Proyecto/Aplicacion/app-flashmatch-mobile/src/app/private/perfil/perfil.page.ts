import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonGrid, IonButton, IonIcon, IonAvatar, IonChip, IonLabel, IonList, IonItem, IonFooter, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonRange, IonAccordion, IonBadge, IonAccordionGroup, IonText } from '@ionic/angular/standalone';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, plugins } from 'chart.js';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonText, IonAccordionGroup, IonBadge, IonAccordion, IonRange, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFooter, IonItem, IonList, IonLabel, IonChip, IonAvatar, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BaseChartDirective]
})
export default class PerfilPage {
  public radarChartLabels: string[] = ['Velocidad', 'Resistencia', 'Técnica', 'Táctica'];

  public radarChartData = [
    { data: [40, 85, 23, 55] }
  ];

  public radarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false
        },
      }
    }
  };

  user = {
    name: 'Juan Pérez',
    team: 'Los Tigres FC',
    position: 'Delantero',
    titles: ['Usuario habitual 2023', 'Jugador veterano'],
    sports: [
      { name: 'Fútbol 11', position: 'Defensa' },
      { name: 'Fútbol 7', position: 'Arquero' },
      { name: 'Fútbol 5', position: 'Arquero' },
    ],
    matches: [
      {
        date: '2024-09-01',
        opponent: 'Águilas FC',
        score: '3-1',
        position: 'Delantero'
      },
      {
        date: '2024-09-10',
        opponent: 'Leones FC',
        score: '2-2',
        position: 'Delantero'
      }
    ]
  };

  selectedSport = {
    name: 'Fútbol',
    chartData: [
      { data: [80, 70, 90, 85, 75], label: 'Rendimiento' } // Ejemplo de rendimiento en fútbol
    ],
    performance: {
      speed: 80,
      stamina: 85,
      precision: 90
    }
  };

  editSport(sport:any) {
    this.selectedSport = sport; // Cambiar el deporte seleccionado
  }

  saveUserData() {
    // Aquí guardarías los cambios del usuario
    console.log('Datos guardados:', this.user);
  }

  resetUserData() {
    // Aquí restablecerías los valores del usuario
    console.log('Datos restablecidos');
  }

  viewHistory() {
    // Aquí mostrarías el historial completo de partidos
    console.log('Ver historial completo');
  }
}
