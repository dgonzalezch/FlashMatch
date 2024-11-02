import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateReservaCanchaDto } from './dto/create-reserva-cancha.dto';
import { UpdateReservaCanchaDto } from './dto/update-reserva-cancha.dto';
import { ReservaCancha } from './entities/reserva-cancha.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancha } from 'src/cancha/entities/cancha.entity';
import { DisponibilidadCancha } from 'src/cancha/entities/disponibilidad-cancha.entity';
import { Partido } from 'src/partido/entities/partido.entity';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NotificacionService } from 'src/common/notificacion/notificacion.service';
import { PagoService } from 'src/common/pago/pago.service';

@Injectable()
export class ReservaService {
  private readonly logger = new Logger('ReservaService');

  constructor(
    @InjectRepository(ReservaCancha)
    private readonly reservaCanchaRepository: Repository<ReservaCancha>,
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    @InjectRepository(DisponibilidadCancha)
    private readonly disponibilidadRepository: Repository<DisponibilidadCancha>,
    private readonly notificacionService: NotificacionService,
    private readonly pagoService: PagoService,  // Inyección del servicio de pagos
  ) { }

  async createReservaCancha(createReservaCanchaDto: CreateReservaCanchaDto): Promise<ResponseMessage<ReservaCancha>> {
    const { cancha_id, partido_id, fecha_hora_reserva } = createReservaCanchaDto;
    const fechaHoraReservaDate = new Date(fecha_hora_reserva);

    const cancha = await this.canchaRepository.findOneBy({ id_cancha: cancha_id });
    const partido = await this.partidoRepository.findOneBy({ id_partido: partido_id });
    if (!cancha || !partido) throw new NotFoundException(`Cancha o partido no encontrado.`);

    const disponible = await this.checkAvailability(cancha_id, fechaHoraReservaDate);
    if (!disponible) throw new ConflictException(`La cancha no está disponible en el horario solicitado.`);

    const reservaCancha = this.reservaCanchaRepository.create({
      cancha,
      partido,
      fecha_hora_reserva: fechaHoraReservaDate,
      estado: 'pendiente'
    });
    await this.reservaCanchaRepository.save(reservaCancha);

    // Enviar notificación de creación
    this.notificacionService.sendNotification(partido.creador.id_usuario, 'Su reserva ha sido creada y está pendiente de pago.');

    return { message: 'Reserva creada y pendiente de confirmación de pago.', data: reservaCancha };
  }

  async confirmarReserva(id_reserva: string, monto: number): Promise<ResponseMessage<ReservaCancha>> {
    const reserva = await this.reservaCanchaRepository.findOne({ where: { id_reserva_cancha: id_reserva } });
    if (!reserva) throw new NotFoundException(`Reserva con ID ${id_reserva} no encontrada.`);

    // Procesar pago parcial
    await this.pagoService.procesarPago({ idReserva: id_reserva, monto });

    // Actualizar estado de la reserva
    reserva.estado = 'confirmada';
    await this.reservaCanchaRepository.save(reserva);

    return { message: 'Reserva confirmada con éxito.', data: reserva };
  }

  async recordatorioPagoCompleto(id_reserva: string): Promise<void> {
    const reserva = await this.reservaCanchaRepository.findOne({ where: { id_reserva_cancha: id_reserva }, relations: ['partido'] });
    if (!reserva) throw new NotFoundException(`Reserva con ID ${id_reserva} no encontrada.`);

    // Enviar recordatorio de pago
    await this.notificacionService.sendNotification(reserva.partido.creador.id_usuario, 'Recuerda completar el pago del partido.');
  }

  async cancelarReservaCancha(id_reserva: string): Promise<ResponseMessage<ReservaCancha>> {
    const reserva = await this.reservaCanchaRepository.findOneBy({ id_reserva_cancha: id_reserva });
    if (!reserva) throw new NotFoundException(`Reserva con ID ${id_reserva} no encontrada.`);

    const horasRestantes = this.calcularHorasRestantes(reserva.fecha_hora_reserva);

    // Calcular porcentaje de reembolso
    let porcentajeReembolso = 0;
    if (horasRestantes > 24) {
      porcentajeReembolso = 100;  // Reembolso completo
    } else if (horasRestantes > 2) {
      porcentajeReembolso = 50;  // Reembolso parcial
    }

    // Procesar reembolso
    await this.pagoService.procesarReembolso({ idReserva: id_reserva, porcentaje: porcentajeReembolso });

    // Cambiar estado de la reserva
    reserva.estado = 'cancelado';
    await this.reservaCanchaRepository.save(reserva);

    this.notificacionService.sendNotification(reserva.partido.creador.id_usuario, 'Su reserva ha sido cancelada.');

    return { message: 'Reserva cancelada y reembolso procesado según política.', data: reserva };
  }

  async findAllReservasCancha(paginationDto: PaginationDto): Promise<ResponseMessage<ReservaCancha[]>> {
    const { limit = 10, offset = 0 } = paginationDto;
    const reservas = await this.reservaCanchaRepository.find({
      take: limit,
      skip: offset,
      relations: ['cancha', 'partido.creador'],
    });
    return { message: 'Reservas obtenidas exitosamente.', data: reservas };
  }

  async findOneReservaCancha(term: string): Promise<ResponseMessage<ReservaCancha>> {
    let reservaCancha: ReservaCancha;

    if (isUUID(term)) {
      reservaCancha = await this.reservaCanchaRepository.findOne({
        where: { id_reserva_cancha: term },
        relations: ['cancha', 'partido'],
      });
    } else {
      reservaCancha = await this.reservaCanchaRepository.createQueryBuilder('reserva')
        .leftJoinAndSelect('reserva.cancha', 'cancha')
        .leftJoinAndSelect('reserva.partido', 'partido')
        .where('cancha.nombre_cancha = :nombre', { nombre: term })
        .getOne();
    }

    if (!reservaCancha) throw new NotFoundException(`Reserva con término ${term} no encontrada.`);
    return { message: 'Reserva encontrada exitosamente.', data: reservaCancha };
  }

  async updateReservaCancha(id: string, updateReservaCanchaDto: UpdateReservaCanchaDto): Promise<ResponseMessage<ReservaCancha>> {
    const reservaCancha = await this.reservaCanchaRepository.preload({
      id_reserva_cancha: id,
      ...updateReservaCanchaDto,
    });

    if (!reservaCancha) throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
    await this.reservaCanchaRepository.save(reservaCancha);

    return { message: 'Reserva actualizada exitosamente.', data: reservaCancha };
  }

  async removeReservaCancha(id: string): Promise<ResponseMessage<ReservaCancha>> {
    const reservaCancha = await this.reservaCanchaRepository.findOneBy({ id_reserva_cancha: id });
    if (!reservaCancha) throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);

    await this.reservaCanchaRepository.remove(reservaCancha);
    return { message: 'Reserva eliminada exitosamente.', data: reservaCancha };
  }

  async checkAvailability(cancha_id: string, fechaHoraReserva: Date): Promise<boolean> {
    const diaSemana = fechaHoraReserva.getUTCDay() + 1;
    const horaReserva = fechaHoraReserva.toISOString().substring(11, 16);

    const disponibilidad = await this.disponibilidadRepository.findOne({
      where: {
        cancha: { id_cancha: cancha_id },
        dia_semana: diaSemana,
        hora: horaReserva,
        disponible: true,
      },
    });

    return !!disponibilidad;
  }

  async approveOrRejectReservaCancha(id_reserva_cancha: string, estado: 'aceptada' | 'rechazada'): Promise<ResponseMessage<ReservaCancha>> {
    const reservaCancha = await this.reservaCanchaRepository.findOne({
      where: { id_reserva_cancha },
      relations: ['cancha'],
    });
    if (!reservaCancha || reservaCancha.estado !== 'pendiente') throw new NotFoundException(`Reserva no encontrada o ya procesada.`);

    if (estado === 'aceptada') {
      const disponible = await this.checkAvailability(reservaCancha.cancha.id_cancha, reservaCancha.fecha_hora_reserva);
      if (!disponible) throw new ConflictException(`La cancha no está disponible para la fecha y hora de la reserva.`);

      await this.updateAvailability(reservaCancha.cancha.id_cancha, reservaCancha.fecha_hora_reserva);
    }

    reservaCancha.estado = estado;
    reservaCancha.fecha_confirmacion = new Date();
    await this.reservaCanchaRepository.save(reservaCancha);

    const mensaje = estado === 'aceptada' ? 'Su reserva ha sido confirmada.' : 'Su reserva ha sido rechazada.';
    this.notificacionService.sendNotification(reservaCancha.partido.creador.id_usuario, mensaje);

    return { message: `Reserva ${estado} exitosamente.`, data: reservaCancha };
  }

  async updateAvailability(cancha_id: string, fechaHoraReserva: Date): Promise<void> {
    const diaSemana = fechaHoraReserva.getUTCDay() + 1;
    const horaReserva = fechaHoraReserva.toISOString().substring(11, 16);

    const disponibilidad = await this.disponibilidadRepository.findOne({
      where: { cancha: { id_cancha: cancha_id }, dia_semana: diaSemana, hora: horaReserva, disponible: true },
    });

    if (!disponibilidad) throw new ConflictException(`No se encontró disponibilidad para este horario.`);

    disponibilidad.disponible = false;
    await this.disponibilidadRepository.save(disponibilidad);
  }

  private calcularHorasRestantes(fechaHoraReserva: Date): number {
    const ahora = new Date();
    const diferenciaEnMilisegundos = fechaHoraReserva.getTime() - ahora.getTime();
    return Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
  }
}
