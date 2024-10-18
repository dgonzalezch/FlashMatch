import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonItem, IonIcon, IonText, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header-map',
  templateUrl: './header-map.component.html',
  styleUrls: ['./header-map.component.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonItem, IonIcon, IonText, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMapComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
