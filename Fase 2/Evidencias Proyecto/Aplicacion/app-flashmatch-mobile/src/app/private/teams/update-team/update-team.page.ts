import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.page.html',
  styleUrls: ['./update-team.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export default class UpdateTeamPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
