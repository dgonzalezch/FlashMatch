// matchmaking.service.ts (Angular/Ionic)
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class MatchmakingService {
  constructor(private socket: Socket) {}

  requestMatchmaking(tipoPartidoId: string, nivelHabilidadId: string, rangoEdadId: string) {
    this.socket.emit('requestMatch', { tipoPartidoId, nivelHabilidadId, rangoEdadId });
  }

  onMatchFound(callback: (data: any) => void) {
    this.socket.on('matchFound', callback);
  }

  onNoMatchFound(callback: (message: string) => void) {
    this.socket.on('noMatchFound', callback);
  }
}
