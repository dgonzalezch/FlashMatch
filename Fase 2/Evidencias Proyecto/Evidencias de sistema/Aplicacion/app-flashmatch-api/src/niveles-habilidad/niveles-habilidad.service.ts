import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateNivelHabilidadDto } from './dto/create-nivel-habilidad.dto';
import { UpdateNivelHabilidadDto } from './dto/update-nivel-habilidad.dto';
import { NivelHabilidad } from './entities/nivel-habilidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class NivelesHabilidadService {
  private readonly logger = new Logger('NivelesHabilidadService');

  constructor(
    @InjectRepository(NivelHabilidad)
    private readonly nivelHabilidadRepository: Repository<NivelHabilidad>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createNivelHabilidadDto: CreateNivelHabilidadDto): Promise<ResponseMessage<NivelHabilidad>> {
    try {
      const nivelHabilidad = this.nivelHabilidadRepository.create(createNivelHabilidadDto);
      await this.nivelHabilidadRepository.save(nivelHabilidad);

      return { message: 'Nivel habilidad creado exitosamente.', data: nivelHabilidad };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<NivelHabilidad[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const nivelesHabilidad = await this.nivelHabilidadRepository.find({
        take: limit,
        skip: offset
      });

      return { message: 'Registros obtenidos exitosamente.', data: nivelesHabilidad };
    } catch (error) {
      this.logger.error('Error al obtener los niveles de habilidad.', error);
      throw new InternalServerErrorException('Error al obtener los niveles de habilidad, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<NivelHabilidad>> {
    let nivelHabilidad: NivelHabilidad;

    if (isUUID(term)) {
      nivelHabilidad = await this.nivelHabilidadRepository.findOneBy({ id_nivel_habilidad: term });
    } else {
      const queryBuilder = this.nivelHabilidadRepository.createQueryBuilder();
      nivelHabilidad = await queryBuilder
        .where('UPPER(nombre_nivel_habilidad) = :nombre_nivel_habilidad', {
          nombre_nivel_habilidad: term.toUpperCase()
        })
        .getOne();
    }

    if (!nivelHabilidad) throw new NotFoundException(`Nivel de habilidad no encontrado.`);

    return { message: 'Registro encontrado.', data: nivelHabilidad };
  }

  async update(id_nivel_habilidad: string, updateNivelHabilidadDto: UpdateNivelHabilidadDto): Promise<ResponseMessage<NivelHabilidad>> {
    const nivelHabilidad = await this.nivelHabilidadRepository.preload({
      id_nivel_habilidad: id_nivel_habilidad,
      ...updateNivelHabilidadDto,
    });

    if (!nivelHabilidad) throw new NotFoundException(`Nivel habilidad con id ${id_nivel_habilidad} no encontrado.`);

    try {
      await this.nivelHabilidadRepository.save(nivelHabilidad);
      return { message: 'Nivel habilidad actualizado exitosamente.', data: nivelHabilidad };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_nivel_habilidad: string): Promise<ResponseMessage<NivelHabilidad>> {
    try {
      const nivelHabilidad = await this.nivelHabilidadRepository.findOneBy({ id_nivel_habilidad });

      if (!nivelHabilidad) throw new NotFoundException(`Nivel habilidad con id ${id_nivel_habilidad} no se pudo eliminar porque no existe en la base de datos.`);

      await this.nivelHabilidadRepository.remove(nivelHabilidad);
      return { message: 'Nivel habilidad eliminado exitosamente.', data: nivelHabilidad };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
