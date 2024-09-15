import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonList, IonItem, IonButtons, IonImg, IonMenu, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonText } from '@ionic/angular/standalone';
import { HeaderComponent } from '../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '../shared/components/menu/menu.component';

@Component({
  selector: 'app-private',
  templateUrl: './private.layout.html',
  styleUrls: ['./private.layout.scss'],
  standalone: true,
  imports: [IonText, IonCard, IonCol, IonRow, IonGrid, IonMenu, IonMenuButton, IonImg, IonButtons, IonItem, IonList, IonRouterOutlet, IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent, MenuComponent]
})
export default class PrivatePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuItems = [
    { icon: 'home', label: 'Inicio', route: '/home' },
    { icon: 'person-outline', label: 'Perfil', route: '/profile' },
    { icon: 'settings-outline', label: 'Ajustes', route: '/settings' },
    { icon: 'help-circle-outline', label: 'Ayuda', route: '/help' }
  ];
}
