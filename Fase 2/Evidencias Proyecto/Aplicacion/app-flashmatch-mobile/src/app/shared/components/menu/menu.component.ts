import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonLabel, IonMenu, IonButton, IonMenuToggle, IonFooter } from "@ionic/angular/standalone";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonFooter, IonButton, IonLabel, IonIcon, IonImg, IonCol, IonRow, IonGrid, IonTitle, IonToolbar, IonHeader, IonMenu, IonContent, IonList, IonItem, IonMenuToggle, RouterLink]
})
export class MenuComponent  implements OnInit {

  menuItems = signal([
    { icon: 'home-outline', label: 'Inicio', route: '/private/home' },
    { icon: 'search-outline', label: 'Buscador', route: '/private/search' },
    { icon: 'person-outline', label: 'Perfil', route: '/private/profile' },
    { icon: 'log-out-outline', label: 'Cerrar sesión', route: '/auth' },
    // { icon: 'help-circle-outline', label: 'Ayuda', route: '/help' }
  ]);

  ngOnInit() {}

}
