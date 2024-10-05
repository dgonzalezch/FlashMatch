import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRange, IonItem, IonLabel, IonCol, IonRow, IonGrid, IonAccordion, IonAccordionGroup, IonIcon, IonList, IonButton, IonText, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonTabBar, IonTabs, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonText, IonButton, IonList, IonIcon, IonAccordionGroup, IonAccordion, IonGrid, IonRow, IonCol, IonLabel, IonItem, IonRange, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BaseChartDirective]
})
export default class EstadisticasPage implements OnInit {
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

  constructor() { }


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

  ngOnInit() {
  }

}
