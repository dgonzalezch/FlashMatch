import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDeporteDto } from './dto/create-deporte.dto';
import { UpdateDeporteDto } from './dto/update-deporte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deporte } from './entities/deporte.entity';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Injectable()
export class DeportesService {
  private readonly logger = new Logger('DeportesService');

  constructor(
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createDeporteDto: CreateDeporteDto): Promise<ResponseMessage<Deporte>> {
    try {
      const deporte = this.deporteRepository.create(createDeporteDto);
      await this.deporteRepository.save(deporte);

      return { message: 'Deporte creado exitosamente.', data: deporte };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<Deporte[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const deportes = await this.deporteRepository.find({
        take: limit,
        skip: offset,
        relations: {
          equipos: true,
          deportePosiciones: true
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: deportes };
    } catch (error) {
      this.logger.error('Error al obtener los deportes.', error);
      throw new InternalServerErrorException('Error al obtener los deportes, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<Deporte>> {
    let deporte: Deporte;

    if (isUUID(term)) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte: term });
    } else {
      const queryBuilder = await this.deporteRepository.createQueryBuilder();
      deporte = await queryBuilder
        .where('UPPER(nombre_deporte) = :nombre_deporte OR LOWER(icono) = :icono', {
          nombre_deporte: term.toUpperCase(),
          icono: term.toLowerCase(),
        })
        .getOne();
    }

    if (!deporte) throw new NotFoundException(`Deporte no encontrado.`);

    return { message: 'Registro encontrado.', data: deporte };
  }

  async update(id_deporte: string, updateDeporteDto: UpdateDeporteDto): Promise<ResponseMessage<Deporte>> {
    const deporte = await this.deporteRepository.preload({
      id_deporte: id_deporte,
      ...updateDeporteDto,
    });

    if (!deporte) throw new NotFoundException(`Deporte con id ${id_deporte} no encontrado.`);

    try {
      await this.deporteRepository.save(deporte);
      return { message: 'Deporte actualizado exitosamente.', data: deporte };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_deporte: string): Promise<ResponseMessage<Deporte>> {
    try {
      const deporte = await this.deporteRepository.findOneBy({ id_deporte });

      if (!deporte) throw new NotFoundException(`Deporte con id ${id_deporte} no se pudo eliminar porque no existe en la base de datos.`);

      await this.deporteRepository.remove(deporte);
      return { message: 'Deporte eliminado exitosamente.', data: deporte };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
