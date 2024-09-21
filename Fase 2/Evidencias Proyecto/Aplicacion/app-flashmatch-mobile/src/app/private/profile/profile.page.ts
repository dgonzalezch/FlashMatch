import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonItem, IonList, IonItemDivider, IonText, IonInput, IonFooter, IonButton, IonInputPasswordToggle, IonAvatar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonButton, IonFooter, IonInput, IonText, IonItemDivider, IonList, IonItem, IonIcon, IonImg, IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, IonInputPasswordToggle, CommonModule, FormsModule, HeaderComponent, RouterLink]
})
export default class ProfilePage implements OnInit {

  selectedSegment = signal<'data' | 'password'>('data');

  sections = [
    {
      title: 'CUENTA',
      options: [
        { label: 'Editar Perfil', icon: 'home-outline', route: '/editar-perfil' },
        { label: 'Cambiar Foto de Perfil', icon: 'home-outline', route: '/cambiar-foto' }
      ]
    },
    {
      title: 'SEGURIDAD',
      options: [
        { label: 'Cambiar Contraseña', icon: 'home-outline', route: '/cambiar-contrasena' },
        { label: 'Autenticación de Dos Factores', icon: 'home-outline', route: '/autenticacion-dos-factores' }
      ]
    },
    {
      title: 'PRIVACIDAD',
      options: [
        { label: 'Configuración de Privacidad', icon: 'home-outline', route: '/configuracion-privacidad' },
        { label: 'Lista de Bloqueados', icon: 'home-outline', route: '/lista-bloqueados' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onSegmentChange(event: CustomEvent) {
    this.selectedSegment.set(event.detail.value);
  }


}
