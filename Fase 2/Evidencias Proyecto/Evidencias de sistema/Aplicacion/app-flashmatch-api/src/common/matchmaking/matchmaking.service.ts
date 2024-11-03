import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Partido } from 'src/partido/entities/partido.entity';
import { NotificacionService } from '../notificacion/notificacion.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as geolib from 'geolib';

@Injectable()
export class MatchmakingService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    private readonly notificacionService: NotificacionService, // Inyecta el servicio de notificación
  ) {}

  async encontrarPartido(usuarioId: string, radio: number): Promise<Partido> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: usuarioId } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const partidosDisponibles = await this.partidoRepository.find({
      where: { estado: 'confirmado' },
      relations: ['deporte', 'reserva.cancha'],
    });

    const partidosCercanos = partidosDisponibles.filter((partido) => {
      const cancha = partido.reserva.cancha;
      const distancia = geolib.getDistance(
        { latitude: usuario.latitud, longitude: usuario.longitud },
        { latitude: cancha.latitud, longitude: cancha.longitud }
      );
      return distancia <= radio;
    });

    if (partidosCercanos.length === 0) throw new NotFoundException('No se encontraron partidos cercanos');

    const partidoCercano = partidosCercanos[0];

    // Enviar notificación al usuario cuando se encuentra un partido
    await this.notificacionService.sendNotification(
      usuarioId,
      `Se ha encontrado un partido cerca de ti para el deporte ${partidoCercano.deporte.nombre_deporte}.`
    );

    return partidoCercano;
  }

  async unirseAPartido(partidoId: string, usuarioId: string) {
    // const partido = await this.partidoRepository.findOne({ where: { id_partido: partidoId }, relations: ['jugadores'] });
    // if (!partido) throw new NotFoundException('Partido no encontrado');

    // if (partido.jugadores.length >= partido.jugadores_requeridos) throw new Error('Partido completo');

    // const jugador = await this.usuarioRepository.findOne({ where: { id_usuario: usuarioId } });
    // partido.jugadores.push(jugador);
    // await this.partidoRepository.save(partido);
    // return partido;
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async emparejamientoAutomatico() {
    // const usuariosSinPartido = await this.usuarioRepository.find({
    //   where: { estado: 'sin_partido' },
    // });

    // for (const usuario of usuariosSinPartido) {
    //   try {
    //     const partido = await this.encontrarPartido(usuario.id_usuario, 10000); // 10km de radio
    //     await this.unirseAPartido(partido.id_partido, usuario.id_usuario);
    //   } catch (error) {
    //     console.log(`No se encontró partido para el usuario ${usuario.id_usuario}`);
    //   }
    // }
  }
}
