import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Inicializa el almacenamiento
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar token
  async saveToken(token: string) {
    await this._storage?.set('bearer_token', token);
  }

  // Obtener token
  async getToken(): Promise<string | null> {
    return await this._storage?.get('bearer_token');
  }

  // Eliminar token
  async removeToken() {
    await this._storage?.remove('bearer_token');
  }

  // Guardar cualquier variable
  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }
}
