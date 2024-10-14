import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateDeportePosicionUsuarioDto } from './dto/create-deporte-posicion-usuario.dto';
import { UpdateDeportePosicionUsuarioDto } from './dto/update-deporte-posicion-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeportePosicionUsuario } from './entities/deporte-posicion-usuario.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { DeportePosicion } from 'src/deportes-posiciones/entities/deporte-posicion.entity';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Injectable()
export class DeportesPosicionesUsuariosService {
  private readonly logger = new Logger('DeportesPosicionesUsuariosService');

  constructor(
    @InjectRepository(DeportePosicionUsuario)
    private readonly deportePosicionUsuarioRepository: Repository<DeportePosicionUsuario>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    @InjectRepository(DeportePosicion)
    private readonly deportePosicionRepository: Repository<DeportePosicion>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) {}

  async create(createDeportePosicionUsuarioDto: CreateDeportePosicionUsuarioDto): Promise<ResponseMessage<DeportePosicionUsuario>> {
    const { id_usuario, id_deporte, id_posicion } = createDeportePosicionUsuarioDto;

    const usuario = await this.usuarioRepository.findOneBy({ id_usuario });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado.`);

    const deporte = await this.deporteRepository.findOneBy({ id_deporte });
    if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);

    const posicion = await this.deportePosicionRepository.findOneBy({ id_posicion });
    if (!posicion) throw new NotFoundException(`Posición con ID ${id_posicion} no encontrada.`);

    try {
      const deportePosicionUsuario = this.deportePosicionUsuarioRepository.create({
        usuario,
        deporte,
        posicion,
      });

      await this.deportePosicionUsuarioRepository.save(deportePosicionUsuario);
      return { message: 'Relación creada exitosamente.', data: deportePosicionUsuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<DeportePosicionUsuario[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const deportesPosicionesUsuarios = await this.deportePosicionUsuarioRepository.find({
        take: limit,
        skip: offset,
        relations: {
          usuario: true,
          deporte: true,
          posicion: true
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: deportesPosicionesUsuarios };
    } catch (error) {
      this.logger.error('Error al obtener las posiciones del usuario en deportes.', error);
      throw new InternalServerErrorException('Error al obtener los registros, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<DeportePosicionUsuario>> {
    let deportePosicionUsuario: DeportePosicionUsuario;

    if (isUUID(term)) {
      deportePosicionUsuario = await this.deportePosicionUsuarioRepository.findOne({
        where: { id_deporte_posicion: term },
        relations: ['usuario', 'deporte', 'posicion'],
      });
    } else {
      deportePosicionUsuario = await this.deportePosicionUsuarioRepository
        .createQueryBuilder('deportePosicionUsuario')
        .leftJoinAndSelect('deportePosicionUsuario.usuario', 'usuario')
        .leftJoinAndSelect('deportePosicionUsuario.deporte', 'deporte')
        .leftJoinAndSelect('deportePosicionUsuario.posicion', 'posicion')
        .where('UPPER(usuario.nombre) = :nombre OR UPPER(deporte.nombre) = :deporteNombre OR UPPER(posicion.nombre) = :posicionNombre', {
          nombre: term.toUpperCase(),
          deporteNombre: term.toUpperCase(),
          posicionNombre: term.toUpperCase(),
        })
        .getOne();
    }

    if (!deportePosicionUsuario) throw new NotFoundException(`Deporte, posicion o usuario no encontrados.`);

    return { message: 'Registro encontrado.', data: deportePosicionUsuario };
  }

  async update(id_deporte_posicion: string, updateDeportePosicionUsuarioDto: UpdateDeportePosicionUsuarioDto): Promise<ResponseMessage<DeportePosicionUsuario>> {
    const { id_usuario, id_deporte, id_posicion } = updateDeportePosicionUsuarioDto;

    let usuario: Usuario;
    let deporte: Deporte;
    let posicion: DeportePosicion;

    if (id_usuario) {
      usuario = await this.usuarioRepository.findOneBy({ id_usuario });
      if (!usuario) throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado.`);
    }

    if (id_deporte) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);
    }

    if (id_posicion) {
      posicion = await this.deportePosicionRepository.findOneBy({ id_posicion });
      if (!posicion) throw new NotFoundException(`Posición con ID ${id_posicion} no encontrada.`);
    }

    const deportePosicionUsuario = await this.deportePosicionUsuarioRepository.preload({
      id_deporte_posicion,
      ...updateDeportePosicionUsuarioDto,
      usuario,
      deporte,
      posicion,
    });

    if (!deportePosicionUsuario) throw new NotFoundException(`Relación con ID ${id_deporte_posicion} no encontrada.`);

    try {
      await this.deportePosicionUsuarioRepository.save(deportePosicionUsuario);
      return { message: 'Relación actualizada exitosamente.', data: deportePosicionUsuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_deporte_posicion: string): Promise<ResponseMessage<DeportePosicionUsuario>> {
    const deportePosicionUsuario = await this.deportePosicionUsuarioRepository.findOneBy({ id_deporte_posicion });

    if (!deportePosicionUsuario) throw new NotFoundException(`Relación con ID ${id_deporte_posicion} no encontrada.`);

    try {
      await this.deportePosicionUsuarioRepository.remove(deportePosicionUsuario);
      return { message: 'Relación eliminada exitosamente.', data: deportePosicionUsuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
