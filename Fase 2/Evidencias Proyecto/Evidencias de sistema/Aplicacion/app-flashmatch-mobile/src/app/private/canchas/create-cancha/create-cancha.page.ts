import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-create-cancha',
  templateUrl: './create-cancha.page.html',
  styleUrls: ['./create-cancha.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export default class CreateCanchaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
