import { Injectable, InternalServerErrorException, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { Partido } from './entities/partido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { NivelHabilidad } from 'src/nivel-habilidad/entities/nivel-habilidad.entity';
import { TipoEmparejamiento } from 'src/tipo-emparejamiento/entities/tipo-emparejamiento.entity';
import { RangoEdad } from 'src/rango-edad/entities/rango-edad.entity';
import { TipoPartido } from 'src/tipo-partido/entities/tipo-partido.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ReservaCancha } from 'src/reserva/entities/reserva-cancha.entity';
import { UsuarioPartido } from 'src/usuario-partido/entities/usuario-partido.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificacionService } from 'src/common/notificacion/notificacion.service';

@Injectable()
export class PartidoService {
  private readonly logger = new Logger('PartidoService');

  constructor(
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    @InjectRepository(NivelHabilidad)
    private readonly nivelHabilidadRepository: Repository<NivelHabilidad>,
    @InjectRepository(TipoEmparejamiento)
    private readonly tipoEmparejamientoRepository: Repository<TipoEmparejamiento>,
    @InjectRepository(RangoEdad)
    private readonly rangoEdadRepository: Repository<RangoEdad>,
    @InjectRepository(TipoPartido)
    private readonly tipoPartidoRepository: Repository<TipoPartido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(ReservaCancha)
    private readonly reservaCanchaRepository: Repository<ReservaCancha>,
    @InjectRepository(UsuarioPartido)
    private readonly usuarioPartidoRepository: Repository<UsuarioPartido>,
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly notificacionService: NotificacionService,
  ) { }

  async create(createPartidoDto: CreatePartidoDto): Promise<ResponseMessage<Partido>> {
    const { deporte_id, nivel_habilidad_id, tipo_emparejamiento_id, rango_edad_id, tipo_partido_id, creador_id } = createPartidoDto;

    const deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
    const nivelHabilidad = await this.nivelHabilidadRepository.findOneBy({ id_nivel_habilidad: nivel_habilidad_id });
    const tipoEmparejamiento = await this.tipoEmparejamientoRepository.findOneBy({ id_tipo_emparejamiento: tipo_emparejamiento_id });
    const rangoEdad = await this.rangoEdadRepository.findOneBy({ id_rango_edad: rango_edad_id });
    const tipoPartido = await this.tipoPartidoRepository.findOneBy({ id_tipo_partido: tipo_partido_id });
    const creador = await this.usuarioRepository.findOneBy({ id_usuario: creador_id });

    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    if (!nivelHabilidad) throw new NotFoundException(`Nivel habilidad con ID ${nivel_habilidad_id} no encontrado.`);
    if (!tipoEmparejamiento) throw new NotFoundException(`Tipo emparejamiento con ID ${tipo_emparejamiento_id} no encontrado.`);
    if (!rangoEdad) throw new NotFoundException(`Rango edad con ID ${rango_edad_id} no encontrado.`);
    if (!tipoPartido) throw new NotFoundException(`Tipo partido con ID ${tipo_partido_id} no encontrado.`);
    if (!creador) throw new NotFoundException(`Usuario con ID ${creador_id} no encontrado.`);

    try {
      const fechaExpiracion = new Date(createPartidoDto.fecha_partido);
      fechaExpiracion.setHours(fechaExpiracion.getHours() - 1);

      const partido = this.partidoRepository.create({
        ...createPartidoDto,
        deporte,
        nivelHabilidad,
        tipoEmparejamiento,
        rangoEdad,
        tipoPartido,
        creador,
        estado: 'pendiente_reserva',
        jugadores_requeridos: deporte.cantidad_min_jugadores,
        jugadores_actuales: 1, // Empieza en 1 ya que el creador se añade como jugador
        fecha_expiracion_reserva: fechaExpiracion,
      });

      await this.partidoRepository.save(partido);

      const usuarioPartido = this.usuarioPartidoRepository.create({
        usuario: creador,
        partido,
        estado: 'confirmado',
      });
      await this.usuarioPartidoRepository.save(usuarioPartido);

      return { message: 'Partido creado exitosamente y creador añadido como jugador.', data: partido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<Partido[]>> {
    const { limit = 10, offset = 0 } = paginationDto;
    const partidos = await this.partidoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        creador: {
          evaluaciones: true,
          rangoEdad: true,
          nivelHabilidad: true,
          tipoPartido: true
        },
        deporte: true,
        nivelHabilidad: true,
        tipoEmparejamiento: true,
        rangoEdad: true,
        tipoPartido: true,
        reserva: {
          cancha: {
            material: true
          }
        },
        jugadores: {
          usuario: {
            evaluaciones: true,
            rangoEdad: true,
            nivelHabilidad: true,
            tipoPartido: true
          }
        }
      }
    });
    return { message: 'Registros obtenidos exitosamente.', data: partidos };
  }

  async findOne(term: string): Promise<ResponseMessage<Partido>> {
    let partido: Partido;
    if (isUUID(term)) {
      partido = await this.partidoRepository.findOne({
        where: { id_partido: term },
        relations: {
          creador: true,
          deporte: true,
          nivelHabilidad: true,
          tipoEmparejamiento: true,
          rangoEdad: true,
          tipoPartido: true,
          reserva: {
            cancha: {
              material: true
            }
          },
          jugadores: {
            usuario: {
              evaluaciones: true,
              rangoEdad: true,
              nivelHabilidad: true,
              tipoPartido: true
            }
          }
        }
      });
    } else {
      const queryBuilder = this.partidoRepository.createQueryBuilder('partido');
      partido = await queryBuilder
        .leftJoinAndSelect('partido.creador', 'creador')
        .leftJoinAndSelect('partido.deporte', 'deporte')
        .leftJoinAndSelect('partido.nivelHabilidad', 'nivelHabilidad')
        .leftJoinAndSelect('partido.tipoEmparejamiento', 'tipoEmparejamiento')
        .leftJoinAndSelect('partido.rangoEdad', 'rangoEdad')
        .leftJoinAndSelect('partido.tipoPartido', 'tipoPartido')
        .leftJoinAndSelect('partido.reserva', 'reserva')
        .where('UPPER(deporte.nombre) = :deporteNombre', {
          deporteNombre: term.toUpperCase(),
        })
        .getOne();
    }

    if (!partido) throw new NotFoundException(`Partido no encontrado.`);
    return { message: 'Registro encontrado.', data: partido };
  }

  async update(id_partido: string, updatePartidoDto: UpdatePartidoDto): Promise<ResponseMessage<Partido>> {
    const { deporte_id, nivel_habilidad_id, tipo_emparejamiento_id, rango_edad_id, tipo_partido_id, creador_id } = updatePartidoDto;

    let deporte: Deporte;
    let nivelHabilidad: NivelHabilidad;
    let tipoEmparejamiento: TipoEmparejamiento;
    let rangoEdad: RangoEdad;
    let tipoPartido: TipoPartido;
    let creador: Usuario;

    if (deporte_id) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    }

    if (nivel_habilidad_id) {
      nivelHabilidad = await this.nivelHabilidadRepository.findOneBy({ id_nivel_habilidad: nivel_habilidad_id });
      if (!nivelHabilidad) throw new NotFoundException(`Nivel habilidad con ID ${nivel_habilidad_id} no encontrado.`);
    }

    if (tipo_emparejamiento_id) {
      tipoEmparejamiento = await this.tipoEmparejamientoRepository.findOneBy({ id_tipo_emparejamiento: tipo_emparejamiento_id });
      if (!tipoEmparejamiento) throw new NotFoundException(`Tipo emparejamiento con ID ${tipo_emparejamiento_id} no encontrado.`);
    }

    if (rango_edad_id) {
      rangoEdad = await this.rangoEdadRepository.findOneBy({ id_rango_edad: rango_edad_id });
      if (!rangoEdad) throw new NotFoundException(`Rango edad con ID ${rango_edad_id} no encontrado.`);
    }

    if (tipo_partido_id) {
      tipoPartido = await this.tipoPartidoRepository.findOneBy({ id_tipo_partido: tipo_partido_id });
      if (!tipoPartido) throw new NotFoundException(`Tipo partido con ID ${tipo_partido_id} no encontrado.`);
    }

    if (creador_id) {
      creador = await this.usuarioRepository.findOneBy({ id_usuario: creador_id });
      if (!creador) throw new NotFoundException(`Usuario creador con ID ${creador_id} no encontrado.`);
    }

    const partido = await this.partidoRepository.preload({
      id_partido: id_partido,
      ...updatePartidoDto,
      deporte,
      nivelHabilidad,
      tipoEmparejamiento,
      rangoEdad,
      tipoPartido,
      creador,
    });

    if (!partido) throw new NotFoundException(`Partido con ID ${id_partido} no encontrado.`);

    partido.jugadores_actuales = partido.jugadores_actuales || 1;

    // Verificar el estado de las reservas
    const reservaAceptada = await this.reservaCanchaRepository.findOne({
      where: { partido: { id_partido }, estado: 'aceptada' },
    });

    partido.estado = reservaAceptada ? 'confirmado' : 'pendiente_reserva';

    try {
      await this.partidoRepository.save(partido);
      return { message: 'Partido actualizado exitosamente.', data: partido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_partido: string): Promise<ResponseMessage<Partido>> {
    const partido = await this.partidoRepository.findOneBy({ id_partido });
    if (!partido) throw new NotFoundException(`Partido con ID ${id_partido} no se pudo eliminar porque no existe en la base de datos.`);
    await this.partidoRepository.remove(partido);
    return { message: 'Partido eliminado exitosamente.', data: partido };
  }

  // Método para invitar jugadores al partido
  async invitarJugador(partidoId: string, usuarioId: string): Promise<string> {
    const partido = await this.partidoRepository.findOne({
      where: { id_partido: partidoId },
      relations: ['jugadores', 'creador'],
    });

    if (!partido) throw new NotFoundException(`Partido no encontrado`);

    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: usuarioId });
    if (!usuario) throw new NotFoundException(`Usuario no encontrado`);

    const jugadorExistente = partido.jugadores.find((j) => j.usuario.id_usuario === usuarioId);
    if (jugadorExistente) throw new ConflictException(`El usuario ya está en el partido`);

    const nuevoJugador = this.usuarioPartidoRepository.create({
      usuario,
      partido,
      estado: 'invitado',
    });

    await this.usuarioPartidoRepository.save(nuevoJugador);

    // Notificación de invitación
    await this.notificacionService.sendNotification(usuario.id_usuario, `Has sido invitado al partido de ${partido.deporte.nombre_deporte}`);
    return `Jugador invitado correctamente.`;
  }

  async confirmarAsistencia(usuarioId: string, partidoId: string): Promise<ResponseMessage<UsuarioPartido>> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: { usuario: { id_usuario: usuarioId }, partido: { id_partido: partidoId } },
      relations: ['partido'],
    });
    if (!usuarioPartido) throw new NotFoundException(`Usuario no encontrado en este partido.`);

    usuarioPartido.estado = 'confirmado';
    await this.usuarioPartidoRepository.save(usuarioPartido);

    await this.incrementJugadoresActuales(partidoId);
    await this.checkMinimoJugadores(partidoId);
    return { message: 'Asistencia confirmada.', data: usuarioPartido };
  }

  async aceptarInvitacion(partidoId: string, usuarioId: string): Promise<string> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: { partido: { id_partido: partidoId }, usuario: { id_usuario: usuarioId }, estado: 'invitado' },
    });

    if (!usuarioPartido) throw new NotFoundException(`No se encontró invitación para este usuario.`);

    usuarioPartido.estado = 'confirmado';
    await this.usuarioPartidoRepository.save(usuarioPartido);

    await this.incrementJugadoresActuales(partidoId);

    return `Invitación aceptada correctamente.`;
  }

  async agregarReemplazo(partidoId: string, usuarioReemplazanteId: string, usuarioReemplazadoId: string): Promise<string> {
    const partido = await this.partidoRepository.findOne({
      where: { id_partido: partidoId },
      relations: ['jugadores'],
    });

    if (!partido) throw new NotFoundException(`Partido no encontrado`);

    const jugadorReemplazado = partido.jugadores.find(j => j.usuario.id_usuario === usuarioReemplazadoId && j.estado === 'confirmado');
    if (!jugadorReemplazado) throw new NotFoundException(`El jugador a reemplazar no fue encontrado o no está confirmado.`);

    const usuarioReemplazante = await this.usuarioRepository.findOneBy({ id_usuario: usuarioReemplazanteId });
    if (!usuarioReemplazante) throw new NotFoundException(`El usuario reemplazante no fue encontrado`);

    const nuevoJugador = this.usuarioPartidoRepository.create({
      usuario: usuarioReemplazante,
      partido,
      estado: 'confirmado',
    });

    await this.usuarioPartidoRepository.save(nuevoJugador);

    jugadorReemplazado.estado = 'baja';
    await this.usuarioPartidoRepository.save(jugadorReemplazado);

    await this.decrementJugadoresActuales(partidoId);
    await this.incrementJugadoresActuales(partidoId);

    await this.notificacionService.sendNotification(usuarioReemplazanteId, `Has sido agregado como reemplazo en el partido de ${partido.deporte.nombre_deporte}`);
    await this.notificacionService.sendNotification(usuarioReemplazadoId, `Has sido reemplazado en el partido de ${partido.deporte.nombre_deporte}`);

    return `Reemplazo realizado correctamente.`;
  }

  // Métodos auxiliares para incrementar o decrementar el número de jugadores actuales
  private async incrementJugadoresActuales(partidoId: string): Promise<void> {
    const partido = await this.partidoRepository.findOneBy({ id_partido: partidoId });
    if (partido) {
      partido.jugadores_actuales += 1;
      await this.partidoRepository.save(partido);
    }
  }

  private async decrementJugadoresActuales(partidoId: string): Promise<void> {
    const partido = await this.partidoRepository.findOneBy({ id_partido: partidoId });
    if (partido && partido.jugadores_actuales > 0) {
      partido.jugadores_actuales -= 1;
      await this.partidoRepository.save(partido);
    }
  }

  async checkMinimoJugadores(partidoId: string) {
    const partido = await this.partidoRepository.findOne({
      where: { id_partido: partidoId },
      relations: ['jugadores'],
    });
    if (partido && partido.jugadores.filter(j => j.estado === 'confirmado').length < partido.jugadores_requeridos) {
      partido.estado = 'cancelado';
      await this.partidoRepository.save(partido);
      await this.notificacionService.sendNotification(partido.creador.id_usuario, 'El partido ha sido cancelado debido a falta de jugadores.');
    }
  }

  async rellenarJugadores(partidoId: string): Promise<void> {
    const partido = await this.partidoRepository.findOne({ where: { id_partido: partidoId }, relations: ['jugadores'] });
    const jugadoresFaltantes = partido.jugadores_requeridos - partido.jugadores.length;
    for (let i = 0; i < jugadoresFaltantes; i++) {
      const jugador = this.usuarioPartidoRepository.create({
        partido,
        estado: 'confirmado',
      });
      await this.usuarioPartidoRepository.save(jugador);
    }
  }

  async confirmacionFinal(partidoId: string): Promise<void> {
    const partido = await this.partidoRepository.findOne({ where: { id_partido: partidoId }, relations: ['jugadores'] });
    partido.jugadores.forEach(jugador =>
      this.notificacionService.sendNotification(jugador.usuario.id_usuario, 'Confirme su asistencia final para el partido.'));
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async actualizarEstadosPartidos() {
    const now = new Date();

    // Actualizar partidos a "en curso" si la hora del partido coincide con la hora actual
    const partidosEnCurso = await this.partidoRepository.find({
      where: {
        estado: 'confirmado',
        fecha_partido: LessThanOrEqual(new Date(now.getTime() + 1 * 60 * 1000)), // 1 minuto de margen
      },
    });

    for (const partido of partidosEnCurso) {
      partido.estado = 'en_curso';
      partido.mensaje_estado = 'El partido ha comenzado y está en curso.';
      await this.partidoRepository.save(partido);
    }

    // Finalizar partidos que comenzaron hace exactamente una hora
    const partidosPendientes = await this.partidoRepository.find({
      where: { estado: 'en_curso' },
    });

    for (const partido of partidosPendientes) {
      const horaInicio = new Date(partido.fecha_partido);
      const unaHoraDespues = new Date(horaInicio.getTime() + 60 * 60 * 1000); // sumar una hora

      if (now >= unaHoraDespues) {
        partido.estado = 'finalizado';
        partido.mensaje_estado = 'El partido ha sido finalizado después de una hora de juego.';
        await this.partidoRepository.save(partido);
        await this.notificacionService.sendNotification(partido.creador.id_usuario, partido.mensaje_estado);
      }
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async actualizarEstadosPorTiempo() {
    const now = new Date();

    // Cancelar partidos "Pendiente de Reserva" si están a menos de 5 horas del inicio
    const partidosPendiente = await this.partidoRepository.find({
      where: { estado: 'pendiente_reserva' },
    });

    for (const partido of partidosPendiente) {
      const tiempoRestante = new Date(partido.fecha_partido).getTime() - now.getTime();
      if (tiempoRestante <= 5 * 60 * 60 * 1000) { // 5 horas en milisegundos
        partido.estado = 'cancelado';
        partido.mensaje_estado = 'El partido ha sido cancelado porque no se ha confirmado la reserva a tiempo.';
        await this.partidoRepository.save(partido);
        await this.notificacionService.sendNotification(partido.creador.id_usuario, partido.mensaje_estado);
      }
    }

    // Cancelar partidos "Reservado" si no están "Confirmado" 2 horas antes del inicio
    const partidosReservado = await this.partidoRepository.find({
      where: { estado: 'reservado' },
    });

    for (const partido of partidosReservado) {
      const tiempoRestante = new Date(partido.fecha_partido).getTime() - now.getTime();
      if (tiempoRestante <= 2 * 60 * 60 * 1000) { // 2 horas en milisegundos
        partido.estado = 'cancelado';
        partido.mensaje_estado = 'El partido ha sido cancelado porque no se alcanzó el mínimo de jugadores confirmados.';
        await this.partidoRepository.save(partido);
        await this.notificacionService.sendNotification(partido.creador.id_usuario, partido.mensaje_estado);
      }
    }
  }


}
