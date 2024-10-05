import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonGrid, IonCol, IonList, IonItem, IonLabel, IonButton, IonCardSubtitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonButton, IonLabel, IonItem, IonList, IonCol, IonGrid, IonRow, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export default class HistorialPage implements OnInit {


  user = {
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


  constructor() { }

  ngOnInit() {
  }

}
