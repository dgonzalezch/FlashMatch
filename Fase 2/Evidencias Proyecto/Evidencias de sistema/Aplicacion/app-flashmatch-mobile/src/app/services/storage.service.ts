import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any) {
    if(!this._storage) {
      await this.init();
    }
    return await this._storage?.set(key, value);;
  }

  async get(key: string){
    if(!this._storage) {
      await this.init();
    }
    return await this._storage?.get(key);
  }

  async remove(key: string) {
    if(!this._storage) {
      await this.init();
    }
    return await this._storage?.remove(key);
  }

  async keys() {
    if(!this._storage) {
      await this.init();
    }
    return await this._storage?.keys();
  }

  async clear() {
    if(!this._storage) {
      await this.init();
    }
    return await this._storage?.clear();;
  }
}
