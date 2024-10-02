import { Component, OnInit } from '@angular/core';
import { IonHeader, IonText, IonIcon, IonItem, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonItem,
    IonText,
    IonHeader,
    IonIcon
  ]
})
export class MapComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
