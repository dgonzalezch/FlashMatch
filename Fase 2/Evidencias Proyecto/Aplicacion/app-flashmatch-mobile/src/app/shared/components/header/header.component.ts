import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonTitle, IonImg, IonToolbar, IonHeader, IonButtons, IonBackButton, IonMenuButton } from "@ionic/angular/standalone";
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons,
    IonTitle,
    IonImg,
    IonToolbar,
    IonHeader,
    IonMenuButton
  ]
})
export class HeaderComponent  implements OnInit {

  public typeMenu = input.required<string>();

  ngOnInit() { }

}
