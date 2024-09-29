import { Component, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonTitle, IonImg, IonToolbar, IonHeader, IonButtons, IonBackButton, IonMenuButton, IonButton, IonIcon, IonPopover, IonList, IonItem, IonLabel } from "@ionic/angular/standalone";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonPopover, IonIcon, IonButton, IonBackButton, IonButtons,
    IonTitle,
    IonImg,
    IonToolbar,
    IonHeader,
    IonMenuButton,
    RouterLink
  ]
})
export class HeaderComponent  implements OnInit {

  public typeMenu = input.required<string>();

  ngOnInit() { }

}
