import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonItem, IonList, IonItemDivider, IonText, IonInput, IonFooter, IonButton, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonInput, IonText, IonItemDivider, IonList, IonItem, IonIcon, IonImg, IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, IonInputPasswordToggle, CommonModule, FormsModule, HeaderComponent]
})
export default class ProfilePage implements OnInit {

  selectedSegment = signal<'data' | 'password'>('data');

  constructor() { }

  ngOnInit() {
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedSegment.set(event.detail.value);
  }
}
