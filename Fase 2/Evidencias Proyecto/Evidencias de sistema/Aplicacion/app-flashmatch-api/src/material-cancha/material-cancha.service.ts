import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateMaterialCanchaDto } from './dto/create-material-cancha.dto';
import { UpdateMaterialCanchaDto } from './dto/update-material-cancha.dto';
import { MaterialCancha } from './entities/material-cancha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { Repository } from 'typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class MaterialCanchaService {
  private readonly logger = new Logger('MaterialCanchaService');

  constructor(
    @InjectRepository(MaterialCancha)
    private readonly materialCanchaRepository: Repository<MaterialCancha>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createMaterialCanchaDto: CreateMaterialCanchaDto): Promise<ResponseMessage<MaterialCancha>> {
    try {
      const materialCancha = this.materialCanchaRepository.create(createMaterialCanchaDto);
      await this.materialCanchaRepository.save(materialCancha);

      return { message: 'Material cancha creado exitosamente.', data: materialCancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<MaterialCancha[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const materialesCancha = await this.materialCanchaRepository.find({
        take: limit,
        skip: offset
      });

      return { message: 'Registros obtenidos exitosamente.', data: materialesCancha };
    } catch (error) {
      this.logger.error('Error al obtener los materiales cancha.', error);
      throw new InternalServerErrorException('Error al obtener los materiales cancha, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<MaterialCancha>> {
    let materialCancha: MaterialCancha;

    if (isUUID(term)) {
      materialCancha = await this.materialCanchaRepository.findOneBy({ id_material_cancha: term });
    } else {
      const queryBuilder = this.materialCanchaRepository.createQueryBuilder();
      materialCancha = await queryBuilder
        .where('UPPER(nombre_material_cancha) = :nombre_material_cancha', {
          nombre_material_cancha: term.toUpperCase(),
        })
        .getOne();
    }

    if (!materialCancha) throw new NotFoundException(`Material cancha no encontrado.`);

    return { message: 'Registro encontrado.', data: materialCancha };
  }

  async update(id_material_cancha: string, updateMaterialCanchaDto: UpdateMaterialCanchaDto): Promise<ResponseMessage<MaterialCancha>> {
    const materialCancha = await this.materialCanchaRepository.preload({
      id_material_cancha: id_material_cancha,
      ...updateMaterialCanchaDto,
    });

    if (!materialCancha) throw new NotFoundException(`Material cancha con id ${id_material_cancha} no encontrado.`);

    try {
      await this.materialCanchaRepository.save(materialCancha);
      return { message: 'Material cancha actualizado exitosamente.', data: materialCancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_material_cancha: string): Promise<ResponseMessage<MaterialCancha>> {
    try {
      const materialCancha = await this.materialCanchaRepository.findOneBy({ id_material_cancha: id_material_cancha });

      if (!materialCancha) throw new NotFoundException(`Material cancha con id ${id_material_cancha} no se pudo eliminar porque no existe en la base de datos.`);

      await this.materialCanchaRepository.remove(materialCancha);
      return { message: 'Material cancha eliminado exitosamente.', data: materialCancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
