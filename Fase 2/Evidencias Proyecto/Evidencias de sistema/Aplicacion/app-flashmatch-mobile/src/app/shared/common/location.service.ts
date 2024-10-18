import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private lat!: number;
  private lng!: number;
  private address!: string;

  setLocation(lat: number, lng: number, address: string) {
    this.lat = lat;
    this.lng = lng;
    this.address = address;
  }

  getLocation() {
    console.log('Ubicación:', this.lat, this.lng, this.address);
    return { lat: this.lat, lng: this.lng, address: this.address };
  }

  async loadCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      this.setLocation(latitude, longitude, await this.getAddressFromCoordinates(latitude, longitude));
    } catch (error) {
      console.error('Error obteniendo la ubicación', error);
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
