import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancha } from './entities/cancha.entity';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { MaterialCancha } from 'src/material-cancha/entities/material-cancha.entity';

@Injectable()
export class CanchaService {
  private readonly logger = new Logger('CanchaService');

  constructor(
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    @InjectRepository(MaterialCancha)
    private readonly materialCanchaRepository: Repository<MaterialCancha>,
    private readonly errorHandlingService: ErrorHandlingService
  ) { }

  async create(createCanchaDto: CreateCanchaDto): Promise<ResponseMessage<Cancha>> {
    const { deporte_id, administrador_cancha_id, material_cancha_id } = createCanchaDto;

    const deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
    const materialCancha = await this.materialCanchaRepository.findOneBy({ id_material_cancha: material_cancha_id });
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: administrador_cancha_id });

    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    if (!materialCancha) throw new NotFoundException(`Materia cancha con ID ${material_cancha_id} no encontrado.`);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${administrador_cancha_id} no encontrado.`);

    try {
      const cancha = this.canchaRepository.create({
        ...createCanchaDto,
        deporte: deporte,
        material: materialCancha,
        administrador_cancha: usuario,
      });

      await this.canchaRepository.save(cancha);
      return { message: 'Cancha creada exitosamente.', data: cancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<Cancha[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const canchas = await this.canchaRepository.find({
        take: limit,
        skip: offset,
        relations: {
          deporte: true,
          administrador_cancha: true
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: canchas };
    } catch (error) {
      this.logger.error('Error al obtener las canchas.', error);
      throw new InternalServerErrorException('Error al obtener las canchas, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<Cancha>> {
    let cancha: Cancha;

    if (isUUID(term)) {
      cancha = await this.canchaRepository.findOne({
        where: { id_cancha: term },
        relations: ['creador', 'deporte', 'rango'],
      });
    } else {
      const queryBuilder = this.canchaRepository.createQueryBuilder('cancha');
      cancha = await queryBuilder
        .leftJoinAndSelect('cancha.administrador_cancha', 'administrador')
        .leftJoinAndSelect('cancha.deporte', 'deporte')
        .where('(UPPER(cancha.nombre_cancha) = :nombre OR LOWER(cancha.nombre_cancha) = :logo OR UPPER(deporte.nombre) = :deporteNombre)',
          {
            nombre: term.toUpperCase(),
            logo: term.toLowerCase(),
            deporteNombre: term.toUpperCase(),
            rangoEdadMinima: Number(term),
            rangoEdadMaxima: Number(term)
          })
        .getOne();
    }

    if (!cancha) throw new NotFoundException(`Cancha no encontrado.`);

    return { message: 'Registro encontrado.', data: cancha };
  }

  async update(id_cancha: string, updateCanchaDto: UpdateCanchaDto): Promise<ResponseMessage<Cancha>> {
    const { administrador_cancha_id, deporte_id, material_cancha_id } = updateCanchaDto;

    let usuario: Usuario;
    let deporte: Deporte;
    let materialCancha: MaterialCancha;

    if (administrador_cancha_id) {
      usuario = await this.usuarioRepository.findOneBy({ id_usuario: administrador_cancha_id });
      if (!usuario) throw new NotFoundException(`Administrador cancha con ID ${administrador_cancha_id} no encontrado.`);
    }

    if (deporte_id) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    }

    if (material_cancha_id) {
      materialCancha = await this.materialCanchaRepository.findOneBy({ id_material_cancha: material_cancha_id });
      if (!deporte) throw new NotFoundException(`Material cancha con ID ${material_cancha_id} no encontrado.`);
    }

    const cancha = await this.canchaRepository.preload({
      id_cancha: id_cancha,
      ...updateCanchaDto,
      deporte: deporte,
      material: materialCancha,
      administrador_cancha: usuario,
    });

    if (!cancha) throw new NotFoundException(`Cancha con ID ${id_cancha} no encontrado.`);

    try {
      await this.canchaRepository.save(cancha);
      return { message: 'Cancha actualizado exitosamente.', data: cancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_cancha: string): Promise<ResponseMessage<Cancha>> {
    try {
      const cancha = await this.canchaRepository.findOneBy({ id_cancha });

      if (!cancha) throw new NotFoundException(`Cancha con ID ${id_cancha} no se pudo eliminar porque no existe en la base de datos.`);

      await this.canchaRepository.remove(cancha);
      return { message: 'Cancha eliminado exitosamente.', data: cancha };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
