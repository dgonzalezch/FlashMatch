import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Partido } from 'src/partido/entities/partido.entity';

@WebSocketGateway({
  cors: {
    origin: '*', // Permite cualquier origen; puedes especificar una URL específica si prefieres mayor seguridad
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class PartidosGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private usuariosConectados = new Map<string, { socketId: string; preferencias: any }>(); // userId -> preferencias

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const preferencias = JSON.parse(client.handshake.query.preferencias as string); // Preferencias en formato JSON

    if (userId) {
      this.usuariosConectados.set(userId, { socketId: client.id, preferencias });
      // console.log(`Usuario ${userId} conectado con preferencias:`, preferencias);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = Array.from(this.usuariosConectados.entries()).find(
      ([, data]) => data.socketId === client.id
    )?.[0];

    if (userId) {
      this.usuariosConectados.delete(userId);
      // console.log(`Usuario ${userId} desconectado`);
    }
  }

  emitirNuevoPartido(partido: any) {
    // console.log('Evaluando usuarios para emitir nuevoPartido con parámetros:', partido);
  
    this.usuariosConectados.forEach((data, userId) => {
      const { socketId, preferencias } = data;
  
      // Aquí puedes comparar las preferencias del usuario con los parámetros del partido
      // const cumplePreferencias = this.coincidenPreferencias(preferencias, partido);
  
      // if (cumplePreferencias) {
      //   this.server.to(socketId).emit('nuevoPartido', partido);
      //   console.log(`Evento nuevoPartido emitido a usuario ${userId} que cumple con las preferencias`);
      // }

      //Para pruebas
      this.server.to(socketId).emit('nuevoPartido', partido);
      console.log(`Evento nuevoPartido emitido a usuario ${userId} que cumple con las preferencias`);
    });
  }

  // Método para verificar si las preferencias del usuario coinciden con el partido
  private coincidenPreferencias(preferencias: any, partido: Partido): boolean {
    return (
      (!preferencias.nivelHabilidad || preferencias.nivelHabilidad === partido.nivelHabilidad.id_nivel_habilidad) &&
      (!preferencias.deporte || preferencias.deporte === partido.deporte.id_deporte)
    );
  }
}
