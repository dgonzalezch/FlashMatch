// matchmaking.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchmakingService {
  constructor(private socket: Socket) {}

  conectarUsuario(userId: string, preferencias: any) {
    this.socket.ioSocket.io.opts.query = {
      userId,
      preferencias: JSON.stringify(preferencias),
    };
    this.socket.connect();
  }

  // Método para escuchar el evento "nuevoPartido"
  onNuevoPartido(): Observable<any> {
    return this.socket.fromEvent('nuevoPartido');
  }
}
