import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionJugador } from './entities/evaluacion-jugador.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Partido } from 'src/partido/entities/partido.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificacionService } from '../notificacion/notificacion.service';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionJugador)
    private readonly evaluacionRepository: Repository<EvaluacionJugador>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    private readonly notificacionService: NotificacionService,
  ) { }

  async agregarEvaluacion(partidoId: string, evaluadorId: string, evaluadoId: string, puntuacion: number, comentario: string): Promise<EvaluacionJugador> {
    const evaluador = await this.usuarioRepository.findOneBy({ id_usuario: evaluadorId });
    const evaluado = await this.usuarioRepository.findOneBy({ id_usuario: evaluadoId });
    const partido = await this.partidoRepository.findOneBy({ id_partido: partidoId });

    if (!evaluador || !evaluado || !partido) throw new NotFoundException('Datos del evaluador, evaluado o partido no encontrados.');

    const evaluacion = this.evaluacionRepository.create({
      partido,
      evaluador,
      evaluado,
      puntuacion,
      comentario,
    });

    await this.evaluacionRepository.save(evaluacion);

    // Actualizar el promedio de evaluación del jugador evaluado
    if (evaluado) {
      const evaluaciones = await this.evaluacionRepository.find({ where: { evaluado: { id_usuario: evaluadoId } } });
      const sumaPuntuaciones = evaluaciones.reduce((total, evaluacion) => total + evaluacion.puntuacion, 0);
      evaluado.promedio_evaluacion = sumaPuntuaciones / evaluaciones.length;

      await this.usuarioRepository.save(evaluado);
    }

    return evaluacion;
  }

  async obtenerEvaluacionesDeJugador(evaluadoId: string) {
    return this.evaluacionRepository.find({
      where: { evaluado: { id_usuario: evaluadoId } },
      relations: ['partido', 'evaluador'],
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async notificarEvaluacionJugadores() {
    const partidosFinalizados = await this.partidoRepository.find({
      where: { estado: 'finalizado', evaluacionNotificada: false },
      relations: ['jugadores', 'jugadores.usuario'],
    });
  
    for (const partido of partidosFinalizados) {
      for (const jugador of partido.jugadores) {
        if (jugador.usuario) {  // Verifica que usuario esté definido antes de usarlo
          await this.notificacionService.sendNotification(
            jugador.usuario.id_usuario,
            'El partido ha finalizado. Ahora puedes evaluar a tus compañeros de equipo.'
          );
        }
      }
      partido.evaluacionNotificada = true; // Marcar que se notificó
      await this.partidoRepository.save(partido);
    }
  }
}
