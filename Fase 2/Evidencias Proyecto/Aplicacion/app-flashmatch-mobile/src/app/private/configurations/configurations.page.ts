import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonIcon, IonItem, IonList, IonItemDivider, IonText, IonInput, IonFooter, IonButton, IonInputPasswordToggle, IonAvatar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.page.html',
  styleUrls: ['./configurations.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonButton, IonFooter, IonInput, IonText, IonItemDivider, IonList, IonItem, IonIcon, IonImg, IonCol, IonRow, IonGrid, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, IonInputPasswordToggle, CommonModule, FormsModule, HeaderComponent, RouterLink]
})
export default class ConfigurationsPage implements OnInit {

  selectedSegment = signal<'data' | 'password'>('data');

  sections = [
    {
      title: 'CUENTA',
      options: [
        { label: 'Editar Perfil', icon: 'create-outline', route: '/editar-perfil' },
        // { label: 'Cambiar Foto de Perfil', icon: 'home-outline', route: '/cambiar-foto' }
      ]
    },
    {
      title: 'SEGURIDAD',
      options: [
        { label: 'Cambiar Contraseña', icon: 'key-outline', route: '/cambiar-contrasena' },
        { label: 'Autenticación', icon: 'shield-checkmark-outline', route: '/autenticacion-dos-factores' }
      ]
    },
    {
      title: 'PRIVACIDAD',
      options: [
        { label: 'Configuración', icon: 'lock-closed-outline', route: '/configuracion-privacidad' },
        { label: 'Lista de Bloqueados', icon: 'home-outline', route: '/lista-bloqueados' }
      ]
    },
    {
      title: 'DISPOSITIVO',
      options: [
        { label: 'Ajustes de mi dispositivo', icon: 'phone-portrait-outline', route: '/configuracion-privacidad' },
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
