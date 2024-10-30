import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateReservaCanchaDto } from './dto/create-reserva-cancha.dto';
import { UpdateReservaCanchaDto } from './dto/update-reserva-cancha.dto';
import { ReservaCancha } from './entities/reserva-cancha.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancha } from 'src/cancha/entities/cancha.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { DisponibilidadCancha } from 'src/cancha/entities/disponibilidad-cancha.entity';
import { Partido } from 'src/partido/entities/partido.entity';

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
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async createReservaCancha(createReservaCanchaDto: CreateReservaCanchaDto): Promise<ResponseMessage<ReservaCancha>> {
    const { cancha_id, partido_id, fecha_hora_reserva } = createReservaCanchaDto;
  
    const cancha = await this.canchaRepository.findOneBy({ id_cancha: cancha_id });
    const partido = await this.partidoRepository.findOneBy({ id_partido: partido_id });
  
    if (!cancha) throw new NotFoundException(`Cancha con ID ${cancha_id} no encontrada.`);
    if (!partido) throw new NotFoundException(`Partido con ID ${partido_id} no encontrado.`);
  
    // Convertir `fecha_hora_reserva` a un objeto `Date`
    const fechaHoraReservaDate = new Date(fecha_hora_reserva);
  
    // Verificar si ya existe una reserva para la misma cancha y fechaHora
    const reservaExistente = await this.reservaCanchaRepository.findOne({
      where: {
        cancha: { id_cancha: cancha_id },
        fecha_hora_reserva: fechaHoraReservaDate,
        estado: In(['pendiente', 'aceptada']),
      },
    });
  
    if (reservaExistente) {
      throw new ConflictException(`La cancha ya está reservada para la fecha y hora solicitadas. Intenta nuevamente con otra cancha.`);
    }
  
    try {
      const reservaCancha = this.reservaCanchaRepository.create({
        ...createReservaCanchaDto,
        cancha,
        partido,
        estado: 'pendiente',
      });
  
      await this.reservaCanchaRepository.save(reservaCancha);
  
      return { message: 'Reserva de cancha solicitada exitosamente. Esperando aprobación.', data: reservaCancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
  
  async approveOrRejectReservaCancha(id_reserva_cancha: string, estado: 'aceptada' | 'rechazada'): Promise<ResponseMessage<ReservaCancha>> {
    const reservaCancha = await this.reservaCanchaRepository.findOne({
      where: { id_reserva_cancha },
      relations: ['cancha', 'partido'],
    });
  
    if (!reservaCancha) throw new NotFoundException(`Reserva con ID ${id_reserva_cancha} no encontrada.`);
    if (reservaCancha.estado !== 'pendiente') throw new ConflictException(`La reserva ya fue ${reservaCancha.estado}.`);
  
    reservaCancha.estado = estado;
  
    if (estado === 'aceptada') {
      // Convertir `fecha_hora_reserva` a `Date`
      const fechaHoraReservaDate = new Date(reservaCancha.fecha_hora_reserva);
  
      const disponibilidad = await this.disponibilidadRepository.findOne({
        where: {
          cancha: { id_cancha: reservaCancha.cancha.id_cancha },
          hora: fechaHoraReservaDate.toISOString().substring(11, 16), // Extrae hora en formato HH:mm
          dia_semana: fechaHoraReservaDate.getUTCDay() + 1, // Obtiene el día de la semana
        },
      });
  
      if (!disponibilidad) throw new ConflictException(`Disponibilidad no encontrada para el horario reservado.`);
      disponibilidad.disponible = false;
      await this.disponibilidadRepository.save(disponibilidad);
    }
  
    await this.reservaCanchaRepository.save(reservaCancha);
    await this.actualizarEstadoPartido(reservaCancha.partido.id_partido);
  
    return { message: `Reserva ${estado} exitosamente.`, data: reservaCancha };
  }
  
  
  async actualizarEstadoPartido(partido_id: string): Promise<void> {
    const partido = await this.partidoRepository.findOne({ where: { id_partido: partido_id } });

    if (!partido) throw new NotFoundException(`Partido con ID ${partido_id} no encontrado.`);

    const reservasAceptadas = await this.reservaCanchaRepository.count({
      where: { partido: { id_partido: partido_id }, estado: 'aceptada' },
    });

    partido.estado = reservasAceptadas > 0 ? 'confirmado' : 'pendiente';
    await this.partidoRepository.save(partido);
  }

  async findAllReservasCancha(paginationDto: PaginationDto): Promise<ResponseMessage<ReservaCancha[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const reservaCancha = await this.reservaCanchaRepository.find({
        take: limit,
        skip: offset,
        relations: {
          cancha: true,
          partido: {
            creador: true
          },
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: reservaCancha };
    } catch (error) {
      this.logger.error('Error al obtener los equipos.', error);
      throw new InternalServerErrorException('Error al obtener los equipos, por favor verifica los logs.');
    }
  }

  async findOneReservaCancha(term: string): Promise<ResponseMessage<ReservaCancha>> {
    let reservaCancha: ReservaCancha;

    if (isUUID(term)) {
      reservaCancha = await this.reservaCanchaRepository.findOne({
        where: { id_reserva_cancha: term },
        relations: ['cancha', 'partido'],
      });
    } else {
      const queryBuilder = this.reservaCanchaRepository.createQueryBuilder('reserva_cancha');
      reservaCancha = await queryBuilder
        .leftJoinAndSelect('reserva_cancha.cancha', 'cancha')
        .leftJoinAndSelect('reserva_cancha.partido', 'partido')
        .where('(UPPER(cancha.nombre_cancha) = :nombre)', {
          nombre: term.toUpperCase(),
        })
        .getOne();
    }

    if (!reservaCancha) {
      throw new NotFoundException(`Reserva cancha no encontrada con término: ${term}`);
    }
    return { message: 'Reserva cancha encontrada exitosamente.', data: reservaCancha };
  }

  async updateReservaCancha(id: string, updateReservaCanchaDto: UpdateReservaCanchaDto): Promise<ResponseMessage<ReservaCancha>> {
    const reservaCancha = await this.reservaCanchaRepository.preload({
      id_reserva_cancha: id,
      ...updateReservaCanchaDto,
    });

    if (!reservaCancha) throw new NotFoundException(`Reserva cancha con ID ${id} no encontrada.`);

    try {
      await this.reservaCanchaRepository.save(reservaCancha);
      return { message: 'Reserva cancha actualizada exitosamente.', data: reservaCancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async removeReservaCancha(id: string): Promise<ResponseMessage<ReservaCancha>> {
    const reservaCancha = await this.reservaCanchaRepository.findOneBy({ id_reserva_cancha: id });

    if (!reservaCancha) throw new NotFoundException(`Reserva cancha con ID ${id} no encontrada.`);

    try {
      await this.reservaCanchaRepository.remove(reservaCancha);
      return { message: 'Reserva cancha eliminada exitosamente.', data: reservaCancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
