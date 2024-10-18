import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class LocationResolver implements Resolve<any> {
  constructor(private locationService: LocationService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.locationService.loadCurrentLocation();
    return this.locationService.getLocation();
  }
}
