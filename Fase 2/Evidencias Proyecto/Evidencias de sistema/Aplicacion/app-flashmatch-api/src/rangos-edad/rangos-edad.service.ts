import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRangoEdadDto } from './dto/create-rango-edad.dto';
import { UpdateRangoEdadDto } from './dto/update-rango-edad.dto';
import { RangoEdad } from './entities/rango-edad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { Repository } from 'typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class RangosEdadService {
  private readonly logger = new Logger('RangosEdadService');

  constructor(
    @InjectRepository(RangoEdad)
    private readonly rangoEdadRepository: Repository<RangoEdad>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createRangoEdadDto: CreateRangoEdadDto): Promise<ResponseMessage<RangoEdad>> {
    try {
      const rangoEdad = this.rangoEdadRepository.create(createRangoEdadDto);
      await this.rangoEdadRepository.save(rangoEdad);

      return { message: 'Rango edad creado exitosamente.', data: rangoEdad };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<RangoEdad[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const rangosEdad = await this.rangoEdadRepository.find({
        take: limit,
        skip: offset
      });

      return { message: 'Registros obtenidos exitosamente.', data: rangosEdad };
    } catch (error) {
      this.logger.error('Error al obtener los rangos edad.', error);
      throw new InternalServerErrorException('Error al obtener los rangos edad, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<RangoEdad>> {
    let rangoEdad: RangoEdad;

    if (isUUID(term)) {
      rangoEdad = await this.rangoEdadRepository.findOneBy({ id_rango_edad: term });
    } else {
      const queryBuilder = this.rangoEdadRepository.createQueryBuilder();
      rangoEdad = await queryBuilder
        .where('edad_minima = :edad_minima OR edad_maxima = :edad_maxima', {
          edad_minima: Number(term),
          edad_maxima: Number(term),
        })
        .getOne();
    }

    if (!rangoEdad) throw new NotFoundException(`Rango edad no encontrado.`);

    return { message: 'Registro encontrado.', data: rangoEdad };
  }

  async update(id_rango_edad: string, updateRangoEdadDto: UpdateRangoEdadDto): Promise<ResponseMessage<RangoEdad>> {
    const rangoEdad = await this.rangoEdadRepository.preload({
      id_rango_edad: id_rango_edad,
      ...updateRangoEdadDto,
    });

    if (!rangoEdad) throw new NotFoundException(`Rango edad con id ${id_rango_edad} no encontrado.`);

    try {
      await this.rangoEdadRepository.save(rangoEdad);
      return { message: 'Rango edad actualizado exitosamente.', data: rangoEdad };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_rango_edad: string): Promise<ResponseMessage<RangoEdad>> {
    try {
      const rangoEdad = await this.rangoEdadRepository.findOneBy({ id_rango_edad });

      if (!rangoEdad) throw new NotFoundException(`Rango edad con id ${id_rango_edad} no se pudo eliminar porque no existe en la base de datos.`);

      await this.rangoEdadRepository.remove(rangoEdad);
      return { message: 'Rango edad eliminado exitosamente.', data: rangoEdad };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
