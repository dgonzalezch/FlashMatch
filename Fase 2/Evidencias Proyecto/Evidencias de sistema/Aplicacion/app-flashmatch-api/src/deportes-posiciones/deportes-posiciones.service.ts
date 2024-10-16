import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDeportePosicionDto } from './dto/create-deporte-posicion.dto';
import { UpdateDeportePosicionDto } from './dto/update-deporte-posicion.dto';
import { DeportePosicion } from './entities/deporte-posicion.entity';
import { Repository } from 'typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class DeportesPosicionesService {
  private readonly logger = new Logger('DeportesPosicionesService');

  constructor(
    @InjectRepository(DeportePosicion)
    private readonly deportePosicionRepository: Repository<DeportePosicion>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createDeportePosicionDto: CreateDeportePosicionDto): Promise<ResponseMessage<DeportePosicion>> {
    const { id_deporte} = createDeportePosicionDto;

    const deporte = await this.deporteRepository.findOneBy({ id_deporte });
    if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);

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
        where: { id_posicion: term },
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
  

  async update(id_posicion: string, updateDeportePosicionDto: UpdateDeportePosicionDto): Promise<ResponseMessage<DeportePosicion>> {
    const { id_deporte } = updateDeportePosicionDto;

    let deporte: Deporte;

    if (id_deporte) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);
    }

    const deportePosicion = await this.deportePosicionRepository.preload({
      id_posicion: id_posicion,
      ...updateDeportePosicionDto,
      deporte: deporte,
    });

    if (!deportePosicion) throw new NotFoundException(`Posicion con ID ${id_posicion} no encontrado.`);

    try {
      await this.deportePosicionRepository.save(deportePosicion);
      return { message: 'Posicion actualiza exitosamente.', data: deportePosicion };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_posicion: string): Promise<ResponseMessage<DeportePosicion>> {
    try {
      const deportePosicion = await this.deportePosicionRepository.findOneBy({ id_posicion });

      if (!deportePosicion) throw new NotFoundException(`Posicion con ID ${id_posicion} no se pudo eliminar porque no existe en la base de datos.`);

      await this.deportePosicionRepository.remove(deportePosicion);
      return { message: 'Posicion eliminada exitosamente.', data: deportePosicion };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
