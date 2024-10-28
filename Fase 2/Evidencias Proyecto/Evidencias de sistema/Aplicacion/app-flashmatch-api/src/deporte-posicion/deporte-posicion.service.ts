import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDeportePosicionDto } from './dto/create-deporte-posicion.dto';
import { UpdateDeportePosicionDto } from './dto/update-deporte-posicion.dto';
import { DeportePosicion } from './entities/deporte-posicion.entity';
import { Repository } from 'typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class DeportePosicionService {
  private readonly logger = new Logger('DeportePosicionService');

  constructor(
    @InjectRepository(DeportePosicion)
    private readonly deportePosicionRepository: Repository<DeportePosicion>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createDeportePosicionDto: CreateDeportePosicionDto): Promise<ResponseMessage<DeportePosicion>> {
    const { deporte_id } = createDeportePosicionDto;

    const deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);

    try {
      const deportePosicion = this.deportePosicionRepository.create({
        ...createDeportePosicionDto,
        deporte: deporte,
      });

      await this.deportePosicionRepository.save(deportePosicion);
      return { message: 'Posicion creada exitosamente.', data: deportePosicion };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<DeportePosicion[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const deportesPosiciones = await this.deportePosicionRepository.find({
        take: limit,
        skip: offset,
        relations: {
          deporte: true,
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: deportesPosiciones };
    } catch (error) {
      this.logger.error('Error al obtener las posiciones.', error);
      throw new InternalServerErrorException('Error al obtener las posiciones, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<DeportePosicion>> {
    let deportePosicion: DeportePosicion;

    if (isUUID(term)) {
      deportePosicion = await this.deportePosicionRepository.findOne({
        where: { id_deporte_posicion: term },
        relations: ['deporte'],
      });
    } else {
      deportePosicion = await this.deportePosicionRepository
        .createQueryBuilder('deportePosicion')
        .leftJoinAndSelect('deportePosicion.deporte', 'deporte') // Relación con 'deporte'
        .where('UPPER(deportePosicion.nombre) = :term OR UPPER(deporte.nombre) = :term', {
          term: term.toUpperCase()
        })
        .getOne();
    }

    if (!deportePosicion) throw new NotFoundException(`Posición no encontrada.`);

    return { message: 'Registro encontrado.', data: deportePosicion };
  }

  async update(id_deporte_posicion: string, updateDeportePosicionDto: UpdateDeportePosicionDto): Promise<ResponseMessage<DeportePosicion>> {
    const { deporte_id } = updateDeportePosicionDto;

    let deporte: Deporte;

    if (deporte_id) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    }

    const deportePosicion = await this.deportePosicionRepository.preload({
      id_deporte_posicion: id_deporte_posicion,
      ...updateDeportePosicionDto,
      deporte: deporte,
    });

    if (!deportePosicion) throw new NotFoundException(`Posicion con ID ${id_deporte_posicion} no encontrado.`);

    try {
      await this.deportePosicionRepository.save(deportePosicion);
      return { message: 'Posicion actualizada exitosamente.', data: deportePosicion };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_deporte_posicion: string): Promise<ResponseMessage<DeportePosicion>> {
    try {
      const deportePosicion = await this.deportePosicionRepository.findOneBy({ id_deporte_posicion: id_deporte_posicion });

      if (!deportePosicion) throw new NotFoundException(`Deporte posicion con ID ${id_deporte_posicion} no se pudo eliminar porque no existe en la base de datos.`);

      await this.deportePosicionRepository.remove(deportePosicion);
      return { message: 'Deporte posicion eliminado exitosamente.', data: deportePosicion };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
