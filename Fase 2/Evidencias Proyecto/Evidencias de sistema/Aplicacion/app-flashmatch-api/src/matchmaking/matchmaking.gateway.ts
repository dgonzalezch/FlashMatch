// matchmaking.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchmakingService } from './matchmaking.service';
import { Partido } from 'src/partido/entities/partido.entity';

@WebSocketGateway({ cors: true })
export class MatchmakingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly matchmakingService: MatchmakingService) {}

  // Escucha la solicitud de matchmaking de los clientes
  @SubscribeMessage('requestMatch')
  async handleRequestMatch(
    @MessageBody() data: { tipoPartidoId: string; nivelHabilidadId: string; rangoEdadId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { tipoPartidoId, nivelHabilidadId, rangoEdadId } = data;

    // Buscar partido compatible
    const partido = await this.matchmakingService.findMatch(tipoPartidoId, nivelHabilidadId, rangoEdadId);

    if (partido) {
      // Si se encuentra un partido, enviar al cliente la información
      client.emit('matchFound', partido);
    } else {
      // Agregar a una cola si no hay partidos disponibles de inmediato
      this.matchmakingService.addToQueue(client, data);
      client.emit('noMatchFound', 'Esperando encontrar un partido adecuado...');
    }
  }

  // Notificar a los usuarios en la cola cuando se encuentre un partido adecuado
  async notifyMatchFound(client: Socket, partido: Partido) {
    client.emit('matchFound', partido);
  }
}
