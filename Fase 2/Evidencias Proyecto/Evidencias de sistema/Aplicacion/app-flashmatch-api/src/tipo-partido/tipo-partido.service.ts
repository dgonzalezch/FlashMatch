import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTipoPartidoDto } from './dto/create-tipo-partido.dto';
import { UpdateTipoPartidoDto } from './dto/update-tipo-partido.dto';
import { Repository } from 'typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoPartido } from './entities/tipo-partido.entity';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class TipoPartidoService {
  private readonly logger = new Logger('TipoPartidoService');

  constructor(
    @InjectRepository(TipoPartido)
    private readonly tipoPartidoRepository: Repository<TipoPartido>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createTipoPartidoDto: CreateTipoPartidoDto): Promise<ResponseMessage<TipoPartido>> {
    try {
      const tipoPartido = this.tipoPartidoRepository.create(createTipoPartidoDto);
      await this.tipoPartidoRepository.save(tipoPartido);

      return { message: 'Tipo partido creado exitosamente.', data: tipoPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<TipoPartido[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const tiposPartidos = await this.tipoPartidoRepository.find({
        take: limit,
        skip: offset
      });

      return { message: 'Registros obtenidos exitosamente.', data: tiposPartidos };
    } catch (error) {
      this.logger.error('Error al obtener los tipos de partidos.', error);
      throw new InternalServerErrorException('Error al obtener los tipos de partidos, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<TipoPartido>> {
    let tipoPartido: TipoPartido;

    if (isUUID(term)) {
      tipoPartido = await this.tipoPartidoRepository.findOneBy({ id_tipo_partido: term });
    } else {
      const queryBuilder = this.tipoPartidoRepository.createQueryBuilder();
      tipoPartido = await queryBuilder
        .where('UPPER(nombre_deporte) = :nombre_deporte OR LOWER(icono) = :icono', {
          nombre_deporte: term.toUpperCase(),
          icono: term.toLowerCase(),
        })
        .getOne();
    }

    if (!tipoPartido) throw new NotFoundException(`Tipo partido no encontrado.`);

    return { message: 'Registro encontrado.', data: tipoPartido };
  }

  async update(id_tipo_partido: string, updateTipoPartidoDto: UpdateTipoPartidoDto): Promise<ResponseMessage<TipoPartido>> {
    const tipoPartido = await this.tipoPartidoRepository.preload({
      id_tipo_partido: id_tipo_partido,
      ...updateTipoPartidoDto,
    });

    if (!tipoPartido) throw new NotFoundException(`Tipo partido con id ${id_tipo_partido} no encontrado.`);

    try {
      await this.tipoPartidoRepository.save(tipoPartido);
      return { message: 'Tipo partido actualizado exitosamente.', data: tipoPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_tipo_partido: string): Promise<ResponseMessage<TipoPartido>> {
    try {
      const tipoPartido = await this.tipoPartidoRepository.findOneBy({ id_tipo_partido });

      if (!tipoPartido) throw new NotFoundException(`Tipo partido con id ${id_tipo_partido} no se pudo eliminar porque no existe en la base de datos.`);

      await this.tipoPartidoRepository.remove(tipoPartido);
      return { message: 'Tipo partido eliminado exitosamente.', data: tipoPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
