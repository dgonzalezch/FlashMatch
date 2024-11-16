import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipoEmparejamientoDto } from './dto/create-tipo-emparejamiento.dto';
import { UpdateTipoEmparejamientoDto } from './dto/update-tipo-emparejamiento.dto';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { TipoEmparejamiento } from './entities/tipo-emparejamiento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class TipoEmparejamientoService {
  private readonly logger = new Logger('TipoEmparejamientosService');

  constructor(
    @InjectRepository(TipoEmparejamiento)
    private readonly tipoEmparejamientoRepository: Repository<TipoEmparejamiento>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createTipoEmparejamientoDto: CreateTipoEmparejamientoDto): Promise<ResponseMessage<TipoEmparejamiento>> {
    try {
      const tipoEmparejamiento = this.tipoEmparejamientoRepository.create(createTipoEmparejamientoDto);
      await this.tipoEmparejamientoRepository.save(tipoEmparejamiento);

      return { message: 'Tipo emparejamiento creado exitosamente.', data: tipoEmparejamiento };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<TipoEmparejamiento[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const tiposEmparejamientos = await this.tipoEmparejamientoRepository.find({
        take: limit,
        skip: offset
      });

      return { message: 'Registros obtenidos exitosamente.', data: tiposEmparejamientos };
    } catch (error) {
      this.logger.error('Error al obtener los tipos emparejamientos.', error);
      throw new InternalServerErrorException('Error al obtener los tipos emparejamientos, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<TipoEmparejamiento>> {
    let tipoEmparejamiento: TipoEmparejamiento;

    if (isUUID(term)) {
      tipoEmparejamiento = await this.tipoEmparejamientoRepository.findOneBy({ id_tipo_emparejamiento: term });
    } else {
      const queryBuilder = this.tipoEmparejamientoRepository.createQueryBuilder();
      tipoEmparejamiento = await queryBuilder
        .where('UPPER(nombre_tipo_emparejamiento) = :nombre_tipo_emparejamiento', {
          nombre_tipo_emparejamiento: term.toUpperCase(),
        })
        .getOne();
    }

    if (!tipoEmparejamiento) throw new NotFoundException(`Tipo emparejamiento no encontrado.`);

    return { message: 'Registro encontrado.', data: tipoEmparejamiento };
  }

  async update(id_tipo_emparejamiento: string, updateTipoEmparejamientoDto: UpdateTipoEmparejamientoDto): Promise<ResponseMessage<TipoEmparejamiento>> {
    const tipoEmparejamiento = await this.tipoEmparejamientoRepository.preload({
      id_tipo_emparejamiento: id_tipo_emparejamiento,
      ...updateTipoEmparejamientoDto,
    });

    if (!tipoEmparejamiento) throw new NotFoundException(`Tipo emparejamiento con id ${id_tipo_emparejamiento} no encontrado.`);

    try {
      await this.tipoEmparejamientoRepository.save(tipoEmparejamiento);
      return { message: 'Tipo emparejamiento actualizado exitosamente.', data: tipoEmparejamiento };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_tipo_emparejamiento: string): Promise<ResponseMessage<TipoEmparejamiento>> {
    try {
      const tipoEmparejamiento = await this.tipoEmparejamientoRepository.findOneBy({ id_tipo_emparejamiento });

      if (!tipoEmparejamiento) throw new NotFoundException(`Tipo emparejamiento con id ${id_tipo_emparejamiento} no se pudo eliminar porque no existe en la base de datos.`);

      await this.tipoEmparejamientoRepository.remove(tipoEmparejamiento);
      return { message: 'Tipo emparejamiento eliminado exitosamente.', data: tipoEmparejamiento };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
