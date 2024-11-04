// matchmaking.service.ts
import { Injectable } from '@nestjs/common';
import { Partido } from 'src/partido/entities/partido.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MatchmakingService {
  constructor(
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
  ) {}

  async findMatch(tipoPartidoId: string, nivelHabilidadId: string, rangoEdadId: string): Promise<Partido | null> {
    const partido = await this.partidoRepository
      .createQueryBuilder('partido')
      .leftJoinAndSelect('partido.tipoPartido', 'tipoPartido')
      .leftJoinAndSelect('partido.nivelHabilidad', 'nivelHabilidad')
      .leftJoinAndSelect('partido.rangoEdad', 'rangoEdad')
      .where('partido.estado = :estado', { estado: 'confirmado' })
      .andWhere('partido.jugadores_actuales < partido.jugadores_requeridos')
      .andWhere('partido.tipoPartido.id_tipo_partido = :tipoPartidoId', { tipoPartidoId })
      .andWhere('partido.nivelHabilidad.id_nivel_habilidad = :nivelHabilidadId', { nivelHabilidadId })
      .andWhere('partido.rangoEdad.id_rango_edad = :rangoEdadId', { rangoEdadId })
      .getOne();

    return partido || null;
  }

  isMatch(partido: Partido, criteria: any): boolean {
    return (
      partido.estado === 'confirmado' &&
      partido.jugadores_actuales < partido.jugadores_requeridos &&
      partido.tipoPartido.id_tipo_partido === criteria.tipoPartidoId &&
      partido.nivelHabilidad.id_nivel_habilidad === criteria.nivelHabilidadId &&
      partido.rangoEdad.id_rango_edad === criteria.rangoEdadId
    );
  }
}
