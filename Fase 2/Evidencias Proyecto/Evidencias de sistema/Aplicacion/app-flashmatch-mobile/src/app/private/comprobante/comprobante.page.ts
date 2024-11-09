import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonIcon, IonText, IonNote, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonFooter, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.page.html',
  styleUrls: ['./comprobante.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonNote, IonText, IonIcon, IonCol, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, RouterLink, CommonModule, FormsModule]
})
export default class ComprobantePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
