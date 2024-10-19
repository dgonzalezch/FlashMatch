import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocationService } from './location.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocationResolver implements Resolve<any> {
  constructor(private locationService: LocationService, private storageService: StorageService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!await this.storageService.get('ubicacion')) {
      this.locationService.setLocation(0, 0, '');
    } else {
      await this.locationService.loadCurrentLocation();
    }
  }
}
