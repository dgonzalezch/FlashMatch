import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonImg, IonContent, IonTitle, IonAvatar, IonGrid, IonCol, IonRow, IonInput, IonItem, IonList, IonText, IonHeader, IonButtons, IonToolbar, IonMenuButton, IonButton, IonCheckbox, IonLabel, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonToolbar,
    IonButtons,
    IonHeader,
    IonText,
    IonList,
    IonItem,
    IonRow,
    IonCol,
    IonGrid,
    IonAvatar,
    IonTitle,
    IonContent,
    CommonModule,
    FormsModule,
    IonImg,
    IonInput,
    IonMenuButton,
    RouterLink,
    HeaderComponent
  ]
})
export default class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){ }
}
