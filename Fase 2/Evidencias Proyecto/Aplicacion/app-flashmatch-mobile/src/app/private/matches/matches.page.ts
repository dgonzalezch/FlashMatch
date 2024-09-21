import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonIcon, IonButton, IonFooter, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonSearchbar, IonButtons } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
  standalone: true,
  imports: [IonButtons, IonSearchbar, IonChip, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export default class MatchesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
