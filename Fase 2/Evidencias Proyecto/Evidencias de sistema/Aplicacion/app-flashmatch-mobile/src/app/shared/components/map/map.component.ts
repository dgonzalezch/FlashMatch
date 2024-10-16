import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonText, IonIcon, IonItem, IonToolbar, IonContent } from "@ionic/angular/standalone";
// import { GoogleMap } from '@capacitor/google-maps'

import { environment } from 'src/environments/environment';
const apiKey = environment.googleMapsApiKey;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, IonItem,
    IonText,
    IonHeader,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapComponent {
  // map!: GoogleMap;

  constructor() { }

  // ionViewWillEnter() {
  //   this.initMap()
  // }

  // async initMap() {
  //   this.map = await GoogleMap.create({
  //     id: 'my-map', // Unique identifier for this map instance
  //     element: document.getElementById('map')!, // reference to the capacitor-google-map element
  //     apiKey: apiKey, // Your Google Maps API Key
  //     config: {
  //       center: {
  //         // The initial position to be rendered by the map
  //         lat: 33.6,
  //         lng: -117.9,
  //       },
  //       zoom: 8, // The initial zoom level to be rendered by the map
  //     },
  //   });
  // }

}
