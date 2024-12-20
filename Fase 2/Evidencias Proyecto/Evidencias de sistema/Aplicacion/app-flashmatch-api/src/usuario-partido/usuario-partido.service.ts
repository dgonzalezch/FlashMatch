import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsuarioPartidoDto } from './dto/create-usuario-partido.dto';
import { UpdateUsuarioPartidoDto } from './dto/update-usuario-partido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioPartido } from './entities/usuario-partido.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Partido } from 'src/partido/entities/partido.entity';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { PartidosGateway } from '../matchmaking/matchmaking.gateway';
import { MercadoPagoService } from 'src/mercadopago/mercadopago.service';
import { ReservaCancha } from 'src/reserva/entities/reserva-cancha.entity';
import { NotificacionService } from 'src/common/notificacion/notificacion.service';

@Injectable()
export class UsuarioPartidoService {
  private readonly logger = new Logger('UsuarioPartidoService');

  constructor(
    @InjectRepository(UsuarioPartido)
    private readonly usuarioPartidoRepository: Repository<UsuarioPartido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    @InjectRepository(ReservaCancha)
    private readonly reservaCanchaRepository: Repository<ReservaCancha>,
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly partidosGateway: PartidosGateway,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly notificacionService: NotificacionService,
  ) { }

  async create(createUsuarioPartidoDto: CreateUsuarioPartidoDto): Promise<ResponseMessage<UsuarioPartido>> {
    const { usuario_id, partido_id } = createUsuarioPartidoDto;

    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: usuario_id });
    const partido = await this.partidoRepository.findOneBy({ id_partido: partido_id });

    if (!usuario) throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado.`);
    if (!partido) throw new NotFoundException(`Partido con ID ${partido_id} no encontrado.`);

    try {
      const usuarioPartido = this.usuarioPartidoRepository.create({
        ...createUsuarioPartidoDto,
        usuario: usuario,
        partido: partido
      });

      await this.usuarioPartidoRepository.save(usuarioPartido);
      return { message: 'Usuario unido exitosamente al partido.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<UsuarioPartido[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const usuarioParitdo = await this.usuarioPartidoRepository.find({
        take: limit,
        skip: offset,
        relations: {
          usuario: true,
          partido: true
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: usuarioParitdo };
    } catch (error) {
      this.logger.error('Error al obtener los usuarios en partidos.', error);
      throw new InternalServerErrorException('Error al obtener los usuarios en partidos, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<UsuarioPartido>> {
    let usuarioPartido: UsuarioPartido;

    if (isUUID(term)) {
      usuarioPartido = await this.usuarioPartidoRepository.findOne({
        where: { id_usuario_partido: term },
        // relations: ['deporte'],
      });
    } else {
      usuarioPartido = await this.usuarioPartidoRepository
        .createQueryBuilder('deportePosicion')
        .leftJoinAndSelect('deportePosicion.deporte', 'deporte') // Relación con 'deporte'
        .where('UPPER(deportePosicion.nombre) = :term OR UPPER(deporte.nombre) = :term', {
          term: term.toUpperCase()
        })
        .getOne();
    }

    if (!usuarioPartido) throw new NotFoundException(`Usuario partido no encontrada.`);

    return { message: 'Registro encontrado.', data: usuarioPartido };
  }

  async update(id_usuario_partido: string, updateUsuarioPartidoDto: UpdateUsuarioPartidoDto): Promise<ResponseMessage<UsuarioPartido>> {
    const { usuario_id, partido_id } = updateUsuarioPartidoDto;

    let usuario: Usuario;
    let partido: Partido;

    if (usuario) {
      usuario = await this.usuarioRepository.findOneBy({ id_usuario: usuario_id });
      if (!usuario) throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado.`);
    }

    if (partido) {
      partido = await this.partidoRepository.findOneBy({ id_partido: partido_id });
      if (!partido) throw new NotFoundException(`Partido con ID ${partido_id} no encontrado.`);
    }

    const usuarioPartido = await this.usuarioPartidoRepository.preload({
      id_usuario_partido: id_usuario_partido,
      ...UpdateUsuarioPartidoDto,
      usuario: usuario,
      partido: partido
    });

    if (!usuarioPartido) throw new NotFoundException(`Usuario partido con ID ${id_usuario_partido} no encontrado.`);

    try {
      await this.usuarioPartidoRepository.save(usuarioPartido);
      return { message: 'Usuario partido actualizado exitosamente.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_usuario_partido: string): Promise<ResponseMessage<UsuarioPartido>> {
    try {
      const usuarioPartido = await this.usuarioPartidoRepository.findOneBy({ id_usuario_partido: id_usuario_partido });

      if (!usuarioPartido) throw new NotFoundException(`Usuario partido con ID ${id_usuario_partido} no se pudo eliminar porque no existe en la base de datos.`);

      await this.usuarioPartidoRepository.remove(usuarioPartido);
      return { message: 'Usuario partido eliminado exitosamente.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async isUserAvailableForMatch(userId: string, fecha_partido: Date): Promise<boolean> {
    const existingMatch = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: userId },
        partido: { fecha_partido: fecha_partido },
      },
      relations: ['partido'],
    });

    return !existingMatch; // Retorna true si el usuario no tiene partidos en ese horario
  }

  async joinUserToMatch(userId: string, partidoId: string): Promise<ResponseMessage<any>> {
    const partido = await this.partidoRepository.findOne({
      where: { id_partido: partidoId },
      relations: ['reserva', 'reserva.cancha'],
    });

    if (!partido) throw new NotFoundException(`Partido con ID ${partidoId} no encontrado.`);

    // Validación de la fecha del partido
    if (new Date(partido.fecha_partido) <= new Date()) {
      throw new BadRequestException('No se puede unir a un partido que ya ha pasado.');
    }

    // Verifica si el partido ya está completo
    const currentPlayers = await this.usuarioPartidoRepository.count({
      where: { partido: { id_partido: partidoId }, estado: 'confirmado' },
    });
    if (currentPlayers >= partido.jugadores_requeridos) {
      throw new BadRequestException('Este partido ya tiene el máximo de jugadores.');
    }

    // Validación del estado del partido
    if (partido.estado !== 'confirmado' && partido.estado !== 'abierto') {
      throw new BadRequestException('Este partido no está abierto para nuevos jugadores.');
    }

    // Verifica si el usuario ya está unido al partido
    const existingUserInMatch = await this.usuarioPartidoRepository.findOne({
      where: { usuario: { id_usuario: userId }, partido: { id_partido: partidoId } },
    });
    if (existingUserInMatch) {
      throw new BadRequestException('El usuario ya está unido a este partido.');
    }

    // Verifica la disponibilidad del usuario para el horario del partido
    const isAvailable = await this.isUserAvailableForMatch(userId, partido.fecha_partido);
    if (!isAvailable) throw new BadRequestException('El usuario ya tiene un partido a la misma hora y día.');

    // Cálculo de la cantidad que el usuario debe pagar
    const amountToPay = Math.round(partido.reserva.cancha.precio_por_hora / partido.jugadores_requeridos);
    const userEmail = 'usuario@example.com'; // Obtén el email del usuario desde la base de datos

    // Crear la preferencia de pago en MercadoPago
    const paymentUrl = await this.mercadoPagoService.createPaymentPreference(
      partidoId,
      userId,
      amountToPay,
      userEmail,
    );

    // Unión al partido en estado 'pendiente'
    const usuarioPartido = this.usuarioPartidoRepository.create({
      usuario: { id_usuario: userId },
      partido: partido,
      estado: 'pendiente',
    });

    try {
      await this.usuarioPartidoRepository.save(usuarioPartido);

      // Incrementa el contador de jugadores actuales en el partido
      partido.jugadores_actuales += 1;

      // Verificar si el partido está listo (todos los jugadores requeridos se han unido)
      if (partido.jugadores_actuales >= partido.jugadores_requeridos) {
        partido.estado = 'listo'; // Cambia el estado del partido a "listo"
      }

      await this.partidoRepository.save(partido);

      // Emite un evento si el partido alcanza el máximo de jugadores requeridos
      this.partidosGateway.emitirNuevoPartido(partidoId);

      return {
        message: 'Usuario unido al partido. Complete el pago para confirmar su lugar.',
        data: {
          usuarioPartido,
          paymentUrl,
        }
      }
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async removeUserFromMatch(userId: string, partidoId: string): Promise<ResponseMessage<string>> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: userId },
        partido: { id_partido: partidoId },
      },
    });

    if (!usuarioPartido) {
      throw new NotFoundException(`Usuario no está unido al partido.`);
    }

    try {
      await this.usuarioPartidoRepository.remove(usuarioPartido);
      return { message: 'Usuario eliminado del partido exitosamente.', data: 'Success' };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async leaveMatch(userId: string, partidoId: string): Promise<ResponseMessage<UsuarioPartido>> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: { usuario: { id_usuario: userId }, partido: { id_partido: partidoId } },
    });

    if (!usuarioPartido) {
      throw new NotFoundException(`Usuario no está unido al partido.`);
    }

    if (!usuarioPartido.paymentId) {
      throw new BadRequestException('No se encontró un pago registrado para este usuario.');
    }

    try {
      // Emitir el reembolso usando el paymentId
      await this.mercadoPagoService.refundPayment(usuarioPartido.paymentId);

      // Actualiza el estado del usuario en el partido
      usuarioPartido.estado = 'cancelado';
      usuarioPartido.monto_pagado = 0; // Opcional: poner en cero el monto pagado después del reembolso
      await this.usuarioPartidoRepository.save(usuarioPartido);

      return { message: 'Usuario ha salido del partido y se ha emitido el reembolso.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async confirmPayment(userId: string, partidoId: string, paymentId: string, amountPaid: number) {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: { usuario: { id_usuario: userId }, partido: { id_partido: partidoId } },
      relations: ['partido', 'partido.reserva.cancha', 'partido.creador', 'partido.reserva.cancha.administrador'],
    });

    if (!usuarioPartido) {
      throw new NotFoundException('No se encontró el usuario en el partido para confirmar el pago.');
    }

    // Actualiza el monto pagado, el ID de pago y el estado del usuario
    usuarioPartido.monto_pagado = amountPaid;
    usuarioPartido.paymentId = paymentId;
    usuarioPartido.estado = 'confirmado';
    await this.usuarioPartidoRepository.save(usuarioPartido);

    // Verificar si el usuario es el creador de la reserva
    const isCreador = usuarioPartido.partido.creador.id_usuario == userId;
    if (isCreador) {
      // Si el creador pagó, actualizar la reserva a `pendiente_confirmacion`
      const reserva = usuarioPartido.partido.reserva;
      reserva.estado = 'pendiente_confirmacion';

      await this.reservaCanchaRepository.save(reserva);

      // Notificar al administrador de la cancha
      this.notificacionService.sendNotification(
        reserva.cancha.administrador.id_usuario,
        `La reserva para ${reserva.cancha.nombre_cancha} está pendiente de tu confirmación.`
      );

      console.log('Reserva actualizada a pendiente_confirmacion y notificación enviada al administrador de la cancha.');

      // Notificar al usuario que el pago fue recibido
      this.notificacionService.sendNotification(
        userId,
        'Tu pago ha sido recibido y procesado exitosamente. Se ha notificado al administrador de la cancha.'
      );

    } else {
      // Verificar si todos los jugadores requeridos han pagado y están en estado `confirmado`
      const jugadoresConfirmados = await this.usuarioPartidoRepository.count({
        where: {
          partido: { id_partido: partidoId },
          estado: 'confirmado',
        },
      });

      const jugadoresRequeridos = usuarioPartido.partido.jugadores_requeridos;

      // Actualizar el estado de la reserva si todos los jugadores requeridos han pagado
      if (jugadoresConfirmados >= jugadoresRequeridos) {
        const reserva = usuarioPartido.partido.reserva;
        reserva.estado = 'completa';
        reserva.monto_pagado = jugadoresConfirmados * amountPaid; // Ajuste según cantidad de jugadores confirmados
        reserva.fecha_confirmacion = new Date();
        await this.reservaCanchaRepository.save(reserva);

        // Notificar al administrador de la cancha que todos los jugadores han pagado
        this.notificacionService.sendNotification(
          reserva.cancha.administrador.id_usuario,
          `Todos los jugadores han completado el pago. La reserva para ${reserva.cancha.nombre_cancha} está completa.`
        );
      }
    }
  }

  async sendInvitation(usuarioId: string, partidoId: string, mensaje?: string): Promise<ResponseMessage<UsuarioPartido>> {
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: usuarioId });
    const partido = await this.partidoRepository.findOneBy({ id_partido: partidoId });
  
    if (!usuario) throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
    if (!partido) throw new NotFoundException(`Partido con ID ${partidoId} no encontrado.`);
  
    // Verificar si ya existe una invitación pendiente
    const existingInvitation = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: usuarioId },
        partido: { id_partido: partidoId },
        estado: 'invitado',
      },
    });
  
    if (existingInvitation) {
      throw new BadRequestException('Ya existe una invitación pendiente para este usuario y partido.');
    }
  
    const usuarioPartido = this.usuarioPartidoRepository.create({
      usuario,
      partido,
      estado: 'invitado',
      mensaje_invitacion: mensaje || '',
    });
  
    try {
      await this.usuarioPartidoRepository.save(usuarioPartido);
  
      // Enviar notificación al usuario invitado
      this.notificacionService.sendNotification(
        usuarioId,
        `Has sido invitado a un partido, revisa tus invitaciones.`
      );
  
      return { message: 'Invitación enviada exitosamente.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async acceptInvitation(usuarioId: string, partidoId: string): Promise<ResponseMessage<any>> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: usuarioId },
        partido: { id_partido: partidoId },
        estado: 'invitado',
      },
      relations: ['partido', 'partido.reserva', 'partido.reserva.cancha', 'usuario'], // Relación necesaria para el precio
    });
  
    if (!usuarioPartido) {
      throw new NotFoundException('No se encontró una invitación pendiente para este partido.');
    }
  
    const partido = usuarioPartido.partido;
  
    // Validar que el partido sigue en estado abierto
    if (partido.estado !== 'confirmado' && partido.estado !== 'abierto') {
      throw new BadRequestException('Este partido ya no está disponible para nuevos jugadores.');
    }
  
    // Verificar si el partido ya está completo
    const jugadoresConfirmados = await this.usuarioPartidoRepository.count({
      where: { partido: { id_partido: partidoId }, estado: 'confirmado' },
    });
  
    if (jugadoresConfirmados >= partido.jugadores_requeridos) {
      throw new BadRequestException('El partido ya tiene el máximo de jugadores.');
    }
  
    // Cálculo del monto a pagar por jugador
    const amountToPay = Math.round(partido.reserva.cancha.precio_por_hora / partido.jugadores_requeridos);
    const userEmail = usuarioPartido.usuario.correo; // Obtén el email del usuario
  
    // Crear la preferencia de pago en MercadoPago
    const paymentUrl = await this.mercadoPagoService.createPaymentPreference(
      partido.id_partido,
      usuarioId,
      amountToPay,
      userEmail,
    );
  
    usuarioPartido.estado = 'pendiente';
    await this.usuarioPartidoRepository.save(usuarioPartido);
  
    return {
      message: 'Invitación aceptada. Por favor, completa el pago para confirmar tu lugar.',
      data: {
        paymentUrl,
        usuarioPartido,
      },
    };
  }
  
  async rejectInvitation(usuarioId: string, partidoId: string): Promise<ResponseMessage<UsuarioPartido>> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: usuarioId },
        partido: { id_partido: partidoId },
        estado: 'invitado',
      },
      relations: ['partido'],
    });
  
    if (!usuarioPartido) {
      throw new NotFoundException('No se encontró una invitación pendiente para este partido.');
    }
  
    // Cambiar el estado a 'rechazada'
    usuarioPartido.estado = 'rechazada';
  
    try {
      await this.usuarioPartidoRepository.save(usuarioPartido);
  
      return { message: 'Invitación rechazada exitosamente.', data: usuarioPartido };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrió un error al rechazar la invitación. Por favor, intenta nuevamente.'
      );
    }
  }  
  
  async getPendingInvitations(usuarioId: string): Promise<ResponseMessage<UsuarioPartido[]>> {
    const invitaciones = await this.usuarioPartidoRepository.find({
      where: { usuario: { id_usuario: usuarioId }, estado: 'invitado' },
      relations: ['partido', 'partido.reserva', 'partido.reserva.cancha', 'partido.deporte'],
    });
  
    return { message: 'Invitaciones pendientes obtenidas exitosamente.', data: invitaciones };
  }

  async cancelInvitation(usuarioId: string, partidoId: string): Promise<ResponseMessage<string>> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: usuarioId },
        partido: { id_partido: partidoId },
        estado: 'pendiente',
      },
    });
  
    if (!usuarioPartido) {
      throw new NotFoundException('No se encontró la invitación para cancelar.');
    }
  
    usuarioPartido.estado = 'cancelada';
  
    await this.usuarioPartidoRepository.save(usuarioPartido);
  
    return { message: 'Invitación cancelada exitosamente.', data: 'Success' };
  }
  
}
