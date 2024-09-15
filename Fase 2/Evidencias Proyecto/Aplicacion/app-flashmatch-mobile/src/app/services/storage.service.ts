import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    // Inicializa el almacenamiento
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar token (con observable)
  saveToken(token: string): Observable<void> {
    return from(this._storage?.set('bearer_token', token) ?? Promise.resolve());
  }

  // Obtener token (con observable)
  getToken(): Observable<string | null> {
    return from(this._storage?.get('bearer_token') ?? Promise.resolve(null));
  }

  // Eliminar token (con observable)
  removeToken(): Observable<void> {
    return from(this._storage?.remove('bearer_token') ?? Promise.resolve());
  }

  // Guardar cualquier variable (con observable)
  set(key: string, value: any): Observable<void> {
    return from(this._storage?.set(key, value) ?? Promise.resolve());
  }
}
