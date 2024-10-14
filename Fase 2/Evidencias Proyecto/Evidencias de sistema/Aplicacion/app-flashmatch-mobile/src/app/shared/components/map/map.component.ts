import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonHeader, IonText, IonIcon, IonItem, IonToolbar, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, IonItem,
    IonText,
    IonHeader,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
