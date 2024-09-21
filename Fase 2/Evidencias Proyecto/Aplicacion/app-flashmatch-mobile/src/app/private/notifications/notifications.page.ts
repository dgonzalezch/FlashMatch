import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonIcon, IonItemDivider, IonCardContent, IonCard, IonAccordion, IonAccordionGroup } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonAccordionGroup, IonAccordion, IonCard, IonCardContent, IonItemDivider, RouterLink, IonIcon, IonBadge, IonLabel, IonItem, IonListHeader, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export default class NotificationsPage implements OnInit {

  notifications = [
    { title: 'Invitación a un partido', message: 'Fuiste invitado por Juan Pérez', type: 'invitacion', read: false },
    { title: 'Recordatorio de partido', message: 'Partido a las 10:00 AM el sábado', type: 'recordatorio', read: true },
    { title: 'Mensaje recibido', message: 'Nuevo mensaje de Pedro Gómez', type: 'mensaje', read: false },
    { title: 'Invitación a torneo', message: 'Invitación al torneo de verano', type: 'invitacion', read: true },
    { title: 'Recordatorio de pago', message: 'Pago pendiente para el próximo partido', type: 'recordatorio', read: false },
    { title: 'Mensaje recibido', message: 'Nuevo mensaje de tu equipo', type: 'mensaje', read: true }
  ];

  countUnread(type: string) {
    return this.notifications.filter(notification => notification.type === type && !notification.read).length;
  }

  countTotal(type: string) {
    return this.notifications.filter(notification => notification.type === type).length;
  }

  constructor() { }

  ngOnInit() {
  }

}
