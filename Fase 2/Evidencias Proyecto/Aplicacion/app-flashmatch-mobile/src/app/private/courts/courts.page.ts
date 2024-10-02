import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MapComponent } from 'src/app/shared/components/map/map.component';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.page.html',
  styleUrls: ['./courts.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MapComponent]
})
export default class CourtsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
