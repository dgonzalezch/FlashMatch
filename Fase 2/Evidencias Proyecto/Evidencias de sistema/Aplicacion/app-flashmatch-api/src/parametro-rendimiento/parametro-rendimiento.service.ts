import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateParametroRendimientoDto } from './dto/create-parametro-rendimiento.dto';
import { UpdateParametroRendimientoDto } from './dto/update-parametro-rendimiento.dto';
import { Repository } from 'typeorm';
import { ParametroRendimiento } from './entities/parametro-rendimiento.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ParametroRendimientoService {
  private readonly logger = new Logger('ParametroRendimientoService');

  constructor(
    @InjectRepository(ParametroRendimiento)
    private readonly parametroRendimientoRepository: Repository<ParametroRendimiento>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createParametroRendimientoDto: CreateParametroRendimientoDto): Promise<ResponseMessage<ParametroRendimiento>> {
    const { deporte_id } = createParametroRendimientoDto;

    const deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);

    try {
      const parametroRendimiento = this.parametroRendimientoRepository.create({
        ...createParametroRendimientoDto,
        deporte: deporte,
      });

      await this.parametroRendimientoRepository.save(parametroRendimiento);
      return { message: 'Parametro rendimiento creado exitosamente.', data: parametroRendimiento };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<ParametroRendimiento[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const parametrosRendimiento = await this.parametroRendimientoRepository.find({
        take: limit,
        skip: offset,
        relations: {
          deporte: true,
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: parametrosRendimiento };
    } catch (error) {
      this.logger.error('Error al obtener los parametros de rendimiento.', error);
      throw new InternalServerErrorException('Error al obtener los parametros de rendimiento, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<ParametroRendimiento>> {
    let parametroRendimiento: ParametroRendimiento;

    if (isUUID(term)) {
      parametroRendimiento = await this.parametroRendimientoRepository.findOne({
        where: { id_parametro_rendimiento: term },
        relations: {
          deporte: true,
        },
      });
    } else {
      const queryBuilder = this.parametroRendimientoRepository.createQueryBuilder('parametroRendimiento');
      parametroRendimiento = await queryBuilder
      .leftJoinAndSelect('parametroRendimiento.deporte', 'deporte')
      .where('(UPPER(deporte.nombre) = :term OR UPPER(parametroRendimiento.nombre_parametro) = :term)', {
        term: term.toUpperCase(),
      })
      .getOne();
    }

    if (!parametroRendimiento) throw new NotFoundException(`Parametro de rendimiento no encontrado.`);

    return { message: 'Registro encontrado.', data: parametroRendimiento };
  }

  async update(id_parametro_rendimiento: string, updateParametroRendimientoDto: UpdateParametroRendimientoDto): Promise<ResponseMessage<ParametroRendimiento>> {
    const { deporte_id } = updateParametroRendimientoDto;

    let deporte: Deporte;

    if (deporte_id) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    }

    const parametroRendimiento = await this.parametroRendimientoRepository.preload({
      id_parametro_rendimiento: id_parametro_rendimiento,
      ...updateParametroRendimientoDto,
      deporte: deporte,
    });

    if (!parametroRendimiento) throw new NotFoundException(`Parametro rendimiento con ID ${parametroRendimiento} no encontrado.`);

    try {
      await this.parametroRendimientoRepository.save(parametroRendimiento);
      return { message: 'Parametro rendimiento actualizado exitosamente.', data: parametroRendimiento };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_parametro_rendimiento: string): Promise<ResponseMessage<ParametroRendimiento>> {
    try {
      const parametroRendimiento = await this.parametroRendimientoRepository.findOneBy({ id_parametro_rendimiento });

      if (!parametroRendimiento) throw new NotFoundException(`Parametro rendimiento con ID ${id_parametro_rendimiento} no se pudo eliminar porque no existe en la base de datos.`);

      await this.parametroRendimientoRepository.remove(parametroRendimiento);
      return { message: 'Parametro rendimiento eliminado exitosamente.', data: parametroRendimiento };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
