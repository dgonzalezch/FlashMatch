import { inject, Injectable, signal } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  storageService = inject(StorageService);
  lat = signal<number>(0);
  lng = signal<number>(0);
  address = signal<string>('');

  setLocation(lat: number, lng: number, address: string) {
    this.lat.set(lat);
    this.lng.set(lng);
    this.address.set(address);
  }

  getLocation() {
    console.log('Ubicación:', this.address(), this.lat(), this.lng());
    return { ubicacion: this.address(), latitud: this.lat(), longitud: this.lng() };
  }

  async loadCurrentLocation() {
    try {
      if(!await this.storageService.get('ubicacion')) {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        await this.getAddressFromCoordinates(latitude, longitude);
        this.setLocation(latitude, longitude, await this.getAddressFromCoordinates(latitude, longitude))
      } else {
        const lat = parseFloat(await this.storageService.get('latitud'));
        const lng = parseFloat(await this.storageService.get('longitud'));
        this.setLocation(lat, lng, await this.getAddressFromCoordinates(lat, lng))
      }

    } catch (error) {
      console.log(error, 'Error obteniendo la ubicación');
    }
  }

  async getAddressFromCoordinates(lat: number, lng: number) {
    const apiKey = environment.googleMapsApiKey;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        console.error('No se encontró una dirección para esas coordenadas.');
        return '';
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      return '';
    }
  }
}
