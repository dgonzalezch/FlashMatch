// matchmaking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partido } from 'src/partido/entities/partido.entity';
import { LessThan, Repository } from 'typeorm';
import { Socket } from 'socket.io'; // Importa el tipo de Socket desde socket.io

@Injectable()
export class MatchmakingService {
  private queue: { client: Socket; criteria: any }[] = [];

  constructor(
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
  ) {}

  async findMatch(tipoPartidoId: string, nivelHabilidadId: string, rangoEdadId: string): Promise<Partido[] | null> {
    const partido = await this.partidoRepository
      .createQueryBuilder('partido')
      .leftJoinAndSelect('partido.tipoPartido', 'tipoPartido')
      .leftJoinAndSelect('partido.nivelHabilidad', 'nivelHabilidad')
      .leftJoinAndSelect('partido.rangoEdad', 'rangoEdad')
      .leftJoinAndSelect('partido.deporte', 'deporte')
      .leftJoinAndSelect('partido.jugadores', 'jugadores')
      // .where('partido.tipo_partido_id = :tipoPartidoId', { tipoPartidoId })
      // .andWhere('partido.nivel_habilidad_id = :nivelHabilidadId', { nivelHabilidadId })
      // .andWhere('partido.rango_edad_id = :rangoEdadId', { rangoEdadId })
      .andWhere('partido.estado = :estado', { estado: 'confirmado' })
      .andWhere('partido.jugadores_actuales < partido.jugadores_requeridos')
      .getMany();
  
    return partido || null;
  }

  // Método para agregar un usuario a la cola
  addToQueue(client: Socket, criteria: any) {
    this.queue.push({ client, criteria });
  }

  // Método para notificar a la cola cuando se crea un nuevo partido
  notifyQueue(partido: Partido) {
    for (const { client, criteria } of this.queue) {
      // Verificar si el partido cumple con los criterios del usuario en cola
      if (this.isMatch(partido, criteria)) {
        client.emit('matchFound', partido); // Emitir evento de 'matchFound' con el partido
      }
    }
  }

  // Método de comparación de criterios
  private isMatch(partido: Partido, criteria: any): boolean {
    console.log(partido)
    return (
      // partido.tipoPartido.id_tipo_partido === criteria.tipoPartidoId &&
      // partido.nivelHabilidad.id_nivel_habilidad === criteria.nivelHabilidadId &&
      // partido.rangoEdad.id_rango_edad === criteria.rangoEdadId &&
      partido.estado === 'confirmado' &&
      partido.jugadores_actuales < partido.jugadores_requeridos
    );
  }
}
