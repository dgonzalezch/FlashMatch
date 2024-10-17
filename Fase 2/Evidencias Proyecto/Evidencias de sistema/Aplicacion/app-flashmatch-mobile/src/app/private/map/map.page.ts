import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';  // Importa Geolocation
import { environment } from 'src/environments/environment';

const apiKey = environment.googleMapsApiKey;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class MapPage {
  map!: GoogleMap;
  markerId!: string;
  currentLat!: number; // Para almacenar la latitud actual
  currentLng!: number; // Para almacenar la longitud actual
  isLoading = signal<boolean>(true); // Estado de carga

  constructor() {}

  ngOnInit() {
    this.loadCurrentLocation();
  }

  // Inicializa el mapa en las coordenadas actuales
  async initMap(lat: number, lng: number) {
    this.currentLat = lat; // Almacena latitud inicial
    this.currentLng = lng; // Almacena longitud inicial

    this.map = await GoogleMap.create({
      id: 'my-map',
      element: document.getElementById('map')!,
      apiKey: apiKey,
      config: {
        center: { lat, lng },
        zoom: 15,

        // Desactivar pantalla completa y modo satélite
        fullscreenControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap'],
        },
      },
    });

    // Añade un marcador en la ubicación inicial (ubicación actual del usuario)
    this.addMarker(lat, lng);

    // Establece isLoading en false una vez que el mapa se ha inicializado
    this.isLoading.set(false);

    // Escucha el evento de clic en el mapa
    this.map.setOnMapClickListener((event) => {
      const lat = event.latitude;
      const lng = event.longitude;
      this.updateMarker(lat, lng); // Actualiza el marcador en la nueva ubicación
      this.saveLocation(lat, lng); // Guarda la nueva ubicación
    });
  }

  // Obtiene la ubicación actual del usuario
  async loadCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      this.initMap(latitude, longitude); // Inicializa el mapa centrado en la ubicación actual
      this.saveLocation(latitude, longitude); // Guarda la ubicación inicial
    } catch (error) {
      console.error('Error obteniendo la ubicación', error);
      this.initMap(33.6, -117.9); // Fallback en caso de error
    }
  }

  // Método para añadir un marcador en el mapa
  async addMarker(lat: number, lng: number) {
    const markerId = await this.map.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      title: 'Mi Ubicación',
      snippet: 'Aquí estás',
    });
    this.markerId = markerId; // Guarda el id del marcador
  }

  // Método para actualizar el marcador cuando se hace clic en el mapa
  async updateMarker(lat: number, lng: number) {
    // Elimina el marcador anterior si existe
    if (this.markerId) {
      await this.map.removeMarker(this.markerId);
    }

    // Añade un nuevo marcador en la nueva ubicación
    const newMarkerId = await this.map.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      title: 'Nueva ubicación',
      snippet: 'Has hecho clic aquí',
    });

    // Guarda el nuevo id del marcador
    this.markerId = newMarkerId;

    // Centra el mapa en la nueva ubicación
    await this.map.setCamera({
      coordinate: { lat, lng },
      // zoom: 15,
    });
  }

  async centerMapOnCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      // Centrar la cámara en la ubicación actual
      await this.map.setCamera({
        coordinate: { lat: latitude, lng: longitude },
        zoom: 15,
      });

      // Actualizar la posición del marcador
      await this.updateMarker(latitude, longitude);

      console.log('Centrado en la ubicación actual:', latitude, longitude);
    } catch (error) {
      console.error('Error al centrar el mapa en la ubicación actual', error);
    }
  }

  // Método para guardar la ubicación (puedes ajustarlo para tu backend o lógica)
  saveLocation(lat: number, lng: number) {
    this.currentLat = lat;
    this.currentLng = lng;
    // Aquí puedes enviar las coordenadas a tu backend o almacenarlas
    console.log('Ubicación guardada:', lat, lng);
    // Lógica para enviar al backend o guardarlo localmente
  }
}
