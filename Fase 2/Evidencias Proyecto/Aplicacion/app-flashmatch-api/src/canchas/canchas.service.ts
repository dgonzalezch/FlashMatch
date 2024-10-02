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
import { Deporte } from 'src/deportes/entities/deporte.entity';

@Injectable()
export class CanchasService {
  private readonly logger = new Logger('CanchasService');

  constructor(
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    private readonly errorHandlingService: ErrorHandlingService
  ) { }

  async create(createCanchaDto: CreateCanchaDto): Promise<ResponseMessage<Cancha>> {
    const { id_deporte, id_administrador_cancha } = createCanchaDto;

    const deporte = await this.deporteRepository.findOneBy({ id_deporte });
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: id_administrador_cancha });

    if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id_administrador_cancha} no encontrado.`);

    try {
      const cancha = this.canchaRepository.create({
        ...createCanchaDto,
        deporte: deporte,
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
    const { id_administrador_cancha, id_deporte } = updateCanchaDto;

    let usuario: Usuario;
    let deporte: Deporte;

    if (id_administrador_cancha) {
      usuario = await this.usuarioRepository.findOneBy({ id_usuario: id_administrador_cancha });
      if (!usuario) throw new NotFoundException(`Administrador con ID ${id_administrador_cancha} no encontrado.`);
    }

    if (id_deporte) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);
    }

    const cancha = await this.canchaRepository.preload({
      id_cancha: id_cancha,
      ...updateCanchaDto,
      administrador_cancha: usuario,
      deporte: deporte,
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
