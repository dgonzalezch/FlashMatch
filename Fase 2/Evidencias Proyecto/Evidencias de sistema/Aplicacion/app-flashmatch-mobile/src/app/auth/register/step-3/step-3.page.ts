import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonFooter, IonButton, IonInput, IonCardHeader, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonText } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.page.html',
  styleUrls: ['./step-3.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonCardHeader, IonInput, IonButton, IonFooter, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step3Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit() { }

}
