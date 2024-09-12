import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDeporteDto } from './dto/create-deporte.dto';
import { UpdateDeporteDto } from './dto/update-deporte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deporte } from './entities/deporte.entity';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class DeportesService {

  private readonly logger = new Logger('DeportesService');

  constructor(
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
  ) { }

  async create(createDeporteDto: CreateDeporteDto): Promise<ResponseMessage<Deporte>> {
    try {
      const deporte = this.deporteRepository.create(createDeporteDto);
      await this.deporteRepository.save(deporte);

      return { data: deporte, message: 'Registro creado' }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<Deporte[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const allDeportes = await this.deporteRepository.find({
        take: limit,
        skip: offset
      });

      return { data: allDeportes, message: 'Registros encontrados' };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(term: string): Promise<ResponseMessage<Deporte>> {
    try {
      let deporte: Deporte

      if (Number.isInteger(Number(term))) {
        deporte = await this.deporteRepository.findOneBy({ id_deporte: Number(term) });
      } else {
        const queryBuilder = await this.deporteRepository.createQueryBuilder();
        deporte = await queryBuilder
          .where('UPPER(nombre_deporte) =:nombre_deporte or LOWER(icono) =:icono', {
            nombre_deporte: term.toUpperCase(),
            icono: term.toLowerCase()
          }).getOne();
      }

      if (!deporte) throw new NotFoundException(`Deporte no encontrado.`);

      return { data: deporte, message: 'Registro encontrado' };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id_deporte: number, updateDeporteDto: UpdateDeporteDto) {
    try {
      const deporte = await this.deporteRepository.preload({
        id_deporte: id_deporte,
        ...updateDeporteDto
      })
  
      if(!deporte) throw new NotFoundException(`Producto con id ${id_deporte} no encontrado.`)

      await this.deporteRepository.save(deporte);

      return { data: deporte, message: 'Registro actualizado' };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id_deporte: number): Promise<ResponseMessage<Deporte>> {
    try {
      const deporte = await this.deporteRepository.findOneBy({ id_deporte });
      
      if (!deporte) throw new NotFoundException(`Deporte con id ${id_deporte} no se pudo eliminar porque no existe en la base de datos.`)

      await this.deporteRepository.remove(deporte);
      return { data: deporte, message: 'Registro eliminado' }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw error;
  }
}
