import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonLabel, IonMenu, IonButton, IonMenuToggle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonIcon, IonImg, IonCol, IonRow, IonGrid, IonTitle, IonToolbar, IonHeader, IonMenu, IonContent, IonList, IonItem, IonMenuToggle, RouterLink]
})
export class MenuComponent  implements OnInit {

  menuItems = signal([
    { icon: 'home', label: 'Inicio', route: '/private/home' },
    { icon: 'person-outline', label: 'Cuenta', route: '/private/profile' },
    { icon: 'settings-outline', label: 'Ajustes', route: '/private/settings' },
    { icon: 'log-out-outline', label: 'Cerrar sesión', route: '/auth' },
    // { icon: 'help-circle-outline', label: 'Ayuda', route: '/help' }
  ]);

  ngOnInit() {}

}
