import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';
import { LocationService } from 'src/app/shared/common/location.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from '../../services/usuarios.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';

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
export default class MapPage implements OnInit {
  alertController = inject(AlertController);
  navController = inject(NavController);
  locationService = inject(LocationService);
  storageService = inject(StorageService);
  usuariosService = inject(UsuariosService);
  alertService = inject(AlertService);

  map!: GoogleMap;
  markerId = signal<string>('');
  currentLat = signal<number>(0);
  currentLng = signal<number>(0);
  currentAddress = signal<string>('');
  isLoading = signal<boolean>(true);

  private clickSubject = new Subject<{ lat: number, lng: number }>();

  constructor() {
    this.clickSubject.pipe(
      debounceTime(500) // Retraso de 500ms para evitar múltiples solicitudes
    ).subscribe(({ lat, lng }) => {
      this.getAddressFromCoordinates(lat, lng);
      this.updateMarker(lat, lng);
      this.saveLocation(lat, lng, this.currentAddress());
    });
  }

  ngOnInit() {
    this.loadCurrentLocation();
  }

  // Inicializa el mapa en las coordenadas actuales
  async initMap(lat: number, lng: number) {
    this.currentLat.set(lat); // Almacena latitud inicial
    this.currentLng.set(lng); // Almacena longitud inicial

    this.map = await GoogleMap.create({
      id: 'my-map',
      element: document.getElementById('map')!,
      apiKey: apiKey,
      config: {
        center: { lat, lng },
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap'],
        },
      },
    });

    // Añade un marcador en la ubicación inicial
    this.addMarker(lat, lng);

    // Establece isLoading en false una vez que el mapa se ha inicializado
    this.isLoading.set(false);

    // Escucha el evento de clic en el mapa
    this.map.setOnMapClickListener((event) => {
      const lat = event.latitude;
      const lng = event.longitude;
      this.clickSubject.next({ lat, lng });
    });
  }

  async getAddressFromCoordinates(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        this.currentAddress.set(data.results[0].formatted_address);
      } else {
        this.handleError(null, 'No se encontró una dirección para esas coordenadas.');
      }
    } catch (error) {
      this.handleError(error, 'Error al obtener la dirección');
    }
  }

  async confirmUbicationSelection() {
    const alert = await this.alertController.create({
      header: 'Confirmar ubicación',
      message: `¿Estás seguro de usar la ubicación seleccionada?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: async () => {
            this.locationService.setLocation(this.currentLat(), this.currentLng(), this.currentAddress());
            this.usuariosService.patchUsuario(await this.storageService.get('user'), this.locationService.getLocation()).subscribe({
              next: async (resp) => {
                await this.storageService.set('ubicacion', resp.data.ubicacion)
                await this.storageService.set('latitud', resp.data.latitud)
                await this.storageService.set('longitud', resp.data.longitud)
                this.alertService.message(resp.message);
              },
              error: (err: responseError) => {
                this.alertService.error(err.message);
              }
            })
            this.navController.back();
          }
        }
      ]
    });

    await alert.present();
  }

  // Obtiene la ubicación actual del usuario
  async loadCurrentLocation() {
    try {
      if(!await this.storageService.get('ubicacion')) {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        this.initMap(latitude, longitude); // Inicializa el mapa centrado en la ubicación actual
        await this.getAddressFromCoordinates(latitude, longitude); // Obtiene el nombre de la ubicación actual
        this.saveLocation(latitude, longitude, this.currentAddress()); // Guarda la ubicación inicial
      } else {
        const lat = parseFloat(await this.storageService.get('latitud'));
        const lng = parseFloat(await this.storageService.get('longitud'));
        this.initMap(lat, lng);
        await this.getAddressFromCoordinates(lat, lng);
        this.saveLocation(lat, lng, this.currentAddress());
      }

    } catch (error) {
      this.handleError(error, 'Error obteniendo la ubicación');
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
    this.markerId.set(markerId); // Guarda el id del marcador
  }

  // Método para actualizar el marcador cuando se hace clic en el mapa
  async updateMarker(lat: number, lng: number) {
    // Elimina el marcador anterior si existe
    if (this.markerId()) {
      await this.map.removeMarker(this.markerId());
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
    this.markerId.set(newMarkerId);

    // Centra el mapa en la nueva ubicación
    await this.map.setCamera({
      coordinate: { lat, lng },
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

      // Obtener y establecer la dirección de la ubicación actual
      await this.getAddressFromCoordinates(latitude, longitude);

      console.log('Centrado en la ubicación actual:', latitude, longitude, this.currentAddress());
    } catch (error) {
      this.handleError(error, 'Error al centrar el mapa en la ubicación actual');
    }
  }

  // Método para guardar la ubicación (puedes ajustarlo para tu backend o lógica)
  saveLocation(lat: number, lng: number, address: string) {
    this.currentLat.set(lat);
    this.currentLng.set(lng);
    console.log('Ubicación guardada:', lat, lng, address);
  }

  // Manejo centralizado de errores
  handleError(error: any, context: string) {
    console.error(`Error en ${context}:`, error);
  }
}
