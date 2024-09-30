import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonGrid, IonSearchbar, IonCol, IonCard, IonCardHeader, IonItem, IonAvatar, IonLabel, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonButton, IonFab, IonFabButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonFabButton, IonFab, IonButton, IonFooter, IonCardContent, IonCardSubtitle, IonCardTitle, IonLabel, IonAvatar, IonItem, IonCardHeader, IonCard, IonCol, IonSearchbar, IonGrid, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent]
})
export default class ListUsersPage implements OnInit {

  constructor() { }

  // listUsuarios = signal<any[]>([]);


  listUsuarios = [
    {
      id_usuario: 1,
      nombre: 'Juan Pérez',
      avatar: '', // Si no tiene avatar, se mostrará el avatar por defecto
      ciudad: 'Santiago',
      partidos_jugados: 15,
      ranking: 1200,
      posicion: 'Delantero'
    },
    {
      id_usuario: 2,
      nombre: 'Ana Martínez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      ciudad: 'Concepción',
      partidos_jugados: 20,
      ranking: 1500,
      posicion: 'Portera'
    },
    {
      id_usuario: 3,
      nombre: 'Carlos Gómez',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      ciudad: 'Valparaíso',
      partidos_jugados: 10,
      ranking: 1100,
      posicion: 'Defensa'
    },
    {
      id_usuario: 4,
      nombre: 'María Fernández',
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
      ciudad: 'La Serena',
      partidos_jugados: 25,
      ranking: 1600,
      posicion: 'Centrocampista'
    }
  ];

  ngOnInit() {
  }

  // Cargar lista de usuarios
  loadUsuarios() {
    // this.usuarioService.getUsuarios().subscribe((usuarios) => {
    //   this.listUsuarios = usuarios;
    // });
  }

  filterUsuarios(event: any) {
    // const searchTerm = event.target.value.toLowerCase();
    // if (!searchTerm) {
    //   this.loadUsuarios(); // Cargar todos los usuarios si no hay búsqueda
    // } else {
    //   this.listUsuarios = this.listUsuarios.filter(usuario =>
    //     usuario.nombre.toLowerCase().includes(searchTerm) ||
    //     usuario.ciudad.toLowerCase().includes(searchTerm)
    //   );
    // }
  }

  viewUserDetails(id_usuario: number) {
    console.log('Ver detalles de usuario con ID:', id_usuario);
  }

  invitarUsuario(id_usuario: number) {
    console.log('Invitar al usuario con ID:', id_usuario);
  }
}
