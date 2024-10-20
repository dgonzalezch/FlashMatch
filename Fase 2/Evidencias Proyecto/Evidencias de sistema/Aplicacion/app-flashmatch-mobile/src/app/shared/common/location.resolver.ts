import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocationService } from './location.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocationResolver implements Resolve<any> {
  private locationService = inject(LocationService);
  private storageService = inject(StorageService);
  private authService = inject(AuthService);

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!await this.storageService.get('ubicacion')) {
      this.locationService.setLocation(0, 0, '');
    } else {
      await this.locationService.loadCurrentLocation();
    }
  }
}
