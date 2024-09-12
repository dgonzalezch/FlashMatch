import { Component, input, OnInit } from '@angular/core';
import { IonTitle, IonImg, IonToolbar, IonHeader, IonButtons, IonBackButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons,
    IonTitle,
    IonImg,
    IonToolbar,
    IonHeader
  ]
})
export class HeaderComponent  implements OnInit {

  public typeMenu = input.required<string>();

  constructor() { }

  ngOnInit() {}

}
