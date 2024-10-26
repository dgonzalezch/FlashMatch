import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateReservaCanchaDto } from './dto/create-reserva-cancha.dto';
import { UpdateReservaCanchaDto } from './dto/update-reserva-cancha.dto';
import { ReservaCancha } from './entities/reserva-cancha.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancha } from 'src/cancha/entities/cancha.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { DisponibilidadCancha } from 'src/cancha/entities/disponibilidad-cancha.entity';

@Injectable()
export class ReservaService {
  private readonly logger = new Logger('ReservaService');

  constructor(
    @InjectRepository(ReservaCancha)
    private readonly reservaCanchaRepository: Repository<ReservaCancha>,
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(DisponibilidadCancha)
    private readonly disponibilidadRepository: Repository<DisponibilidadCancha>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) {}

  async createReservaCancha(createReservaCanchaDto: CreateReservaCanchaDto): Promise<ResponseMessage<ReservaCancha>> {
    const { cancha_id, usuario_id } = createReservaCanchaDto;
  
    const cancha = await this.canchaRepository.findOneBy({ id_cancha: cancha_id });
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: usuario_id });
  
    if (!cancha) throw new NotFoundException(`Cancha con ID ${cancha_id} no encontrado.`);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado.`);
  
    try {
      // Crear la reserva en estado "pendiente"
      const reservaCancha = this.reservaCanchaRepository.create({
        ...createReservaCanchaDto,
        cancha,
        usuario,
        estado: 'pendiente',  // Estado inicial de la reserva
      });
  
      await this.reservaCanchaRepository.save(reservaCancha);
  
      return { message: 'Reserva de cancha solicitada exitosamente. Esperando aprobación.', data: reservaCancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async approveOrRejectReservaCancha(id_reserva_cancha: string, estado: 'aceptada' | 'rechazada'): Promise<ResponseMessage<ReservaCancha>> {
    const reservaCancha = await this.reservaCanchaRepository.findOne({
      where: { id_reserva_cancha: id_reserva_cancha },
      relations: ['cancha'],
    });
  
    if (!reservaCancha) throw new NotFoundException(`Reserva con ID ${id_reserva_cancha} no encontrada.`);
    if (reservaCancha.estado !== 'pendiente') throw new ConflictException(`La reserva ya fue ${reservaCancha.estado}.`);
  
    reservaCancha.estado = estado;
  
    if (estado === 'aceptada') {
      // Actualizar disponibilidad
      const disponibilidad = await this.disponibilidadRepository.findOne({
        where: {
          cancha: { id_cancha: reservaCancha.cancha.id_cancha },
          hora: reservaCancha.hora_reserva,
          dia_semana: new Date(reservaCancha.fecha_reserva).getDay() + 1,
        },
      });
  
      if (!disponibilidad) throw new ConflictException(`Disponibilidad no encontrada para el horario reservado.`);
      disponibilidad.disponible = false;
      await this.disponibilidadRepository.save(disponibilidad);
    }
  
    await this.reservaCanchaRepository.save(reservaCancha);
    return { message: `Reserva ${estado} exitosamente.`, data: reservaCancha };
  }
  
  async findAllReservasCancha(paginationDto: PaginationDto): Promise<ResponseMessage<ReservaCancha[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const reservaCancha = await this.reservaCanchaRepository.find({
        take: limit,
        skip: offset,
        relations: {
          cancha: true,
          usuario: true,
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
        relations: ['cancha', 'usuario'],
      });
    } else {
      const queryBuilder = this.reservaCanchaRepository.createQueryBuilder('reserva_cancha');
      reservaCancha = await queryBuilder
        .leftJoinAndSelect('reserva_cancha.cancha', 'cancha')
        .leftJoinAndSelect('reserva_cancha.usuario', 'usuario')
        .where('(UPPER(cancha.nombre_cancha) = :nombre OR LOWER(usuario.correo) = :correo OR UPPER(deporte.nombre_deporte) = :deporteNombre)', {
          nombre: term.toUpperCase(),
          correo: term.toLowerCase(),
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
