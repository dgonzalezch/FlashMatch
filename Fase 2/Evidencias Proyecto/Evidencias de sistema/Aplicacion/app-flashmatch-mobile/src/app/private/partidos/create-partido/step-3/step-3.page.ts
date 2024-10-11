import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCol, IonRow, IonGrid, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonFooter, IonNote } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.page.html',
  styleUrls: ['./step-3.page.scss'],
  standalone: true,
  imports: [IonNote, IonFooter, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonText, IonIcon, IonGrid, IonRow, IonCol, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step3Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
