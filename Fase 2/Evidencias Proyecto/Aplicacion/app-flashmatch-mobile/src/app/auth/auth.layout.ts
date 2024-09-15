import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet, IonImg } from '@ionic/angular/standalone';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.layout.html',
  styleUrls: ['./auth.layout.scss'],
  standalone: true,
  imports: [IonImg, IonRouterOutlet, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export default class AuthPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
