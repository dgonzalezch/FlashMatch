import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEstadisticaDetalladaUsuarioDto } from './dto/create-estadistica-detallada-usuario.dto';
import { UpdateEstadisticaDetalladaUsuarioDto } from './dto/update-estadistica-detallada-usuario.dto';
import { EstadisticaDetalladaUsuario } from './entities/estadistica-detallada-usuario.entity';
import { Repository } from 'typeorm';
import { ParametroRendimiento } from 'src/parametros-rendimiento/entities/parametro-rendimiento.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class EstadisticasDetalladasUsuariosService {
  private readonly logger = new Logger('EstadisticasDetalladasUsuariosService');

  constructor(
    @InjectRepository(EstadisticaDetalladaUsuario)
    private readonly estadisticaDetalladaUsuarioRepository: Repository<EstadisticaDetalladaUsuario>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    @InjectRepository(ParametroRendimiento)
    private readonly parametroRendimientoRepository: Repository<ParametroRendimiento>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }


  async create(createEstadisticaDetalladaUsuarioDto: CreateEstadisticaDetalladaUsuarioDto): Promise<ResponseMessage<EstadisticaDetalladaUsuario>> {
    const { id_usuario, id_deporte, id_parametro_rendimiento } = createEstadisticaDetalladaUsuarioDto;

    const usuario = await this.usuarioRepository.findOneBy({ id_usuario });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado.`);

    const deporte = await this.deporteRepository.findOneBy({ id_deporte });
    if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);

    const parametroRendimiento = await this.parametroRendimientoRepository.findOneBy({ id_parametro_rendimiento });
    if (!parametroRendimiento) throw new NotFoundException(`Parametro rendimiento con ID ${id_parametro_rendimiento} no encontrado.`);

    try {
      const estadisticaDetalladaUsuario = this.estadisticaDetalladaUsuarioRepository.create({
        ...createEstadisticaDetalladaUsuarioDto,
        usuario,
        deporte,
        parametroRendimiento,
      });

      await this.estadisticaDetalladaUsuarioRepository.save(estadisticaDetalladaUsuario);
      return { message: 'Registro creado exitosamente.', data: estadisticaDetalladaUsuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<EstadisticaDetalladaUsuario[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const deportesPosicionesUsuarios = await this.estadisticaDetalladaUsuarioRepository.find({
        take: limit,
        skip: offset,
        relations: {
          usuario: true,
          deporte: true,
          parametroRendimiento: true
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: deportesPosicionesUsuarios };
    } catch (error) {
      this.logger.error('Error al obtener el detalle las posiciones del usuario en deportes.', error);
      throw new InternalServerErrorException('Error al obtener los registros, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<EstadisticaDetalladaUsuario>> {
    let estadisticaDetalladaUsuario: EstadisticaDetalladaUsuario;

    if (isUUID(term)) {
      // Si el término es un UUID, busca por ID
      estadisticaDetalladaUsuario = await this.estadisticaDetalladaUsuarioRepository.findOne({
        where: { id_estadistica_detallada: term },
        relations: ['usuario', 'deporte', 'parametroRendimiento'],
      });
    } else {
      // Si no es UUID, busca por nombre de usuario, deporte o parámetro de rendimiento
      estadisticaDetalladaUsuario = await this.estadisticaDetalladaUsuarioRepository
        .createQueryBuilder('estadisticaDetalladaUsuario')
        .leftJoinAndSelect('estadisticaDetalladaUsuario.usuario', 'usuario')
        .leftJoinAndSelect('estadisticaDetalladaUsuario.deporte', 'deporte')
        .leftJoinAndSelect('estadisticaDetalladaUsuario.parametroRendimiento', 'parametroRendimiento')
        .where('UPPER(usuario.nombre) = :term OR UPPER(deporte.nombre) = :term OR UPPER(parametroRendimiento.nombre_parametro) = :term', {
          term: term.toUpperCase(),
        })
        .getOne();
    }

    if (!estadisticaDetalladaUsuario) throw new NotFoundException(`Estadística detallada no encontrada con el término: ${term}`);

    return { message: 'Registro encontrado.', data: estadisticaDetalladaUsuario };
  }


  async update(id_estadistica_detallada: string, updateEstadisticaDetalladaUsuarioDto: UpdateEstadisticaDetalladaUsuarioDto): Promise<ResponseMessage<EstadisticaDetalladaUsuario>> {
    const { id_usuario, id_deporte, id_parametro_rendimiento } = updateEstadisticaDetalladaUsuarioDto;

    let usuario: Usuario;
    let deporte: Deporte;
    let parametroRendimiento: ParametroRendimiento;

    if (id_usuario) {
      usuario = await this.usuarioRepository.findOneBy({ id_usuario });
      if (!usuario) throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado.`);
    }

    if (id_deporte) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);
    }

    if (id_parametro_rendimiento) {
      parametroRendimiento = await this.parametroRendimientoRepository.findOneBy({ id_parametro_rendimiento });
      if (!parametroRendimiento) throw new NotFoundException(`Parametro rendimiento con ID ${parametroRendimiento} no encontrado.`);
    }

    const estadisticaDetalladaUsuario = await this.estadisticaDetalladaUsuarioRepository.preload({
      id_estadistica_detallada: id_estadistica_detallada,
      ...updateEstadisticaDetalladaUsuarioDto,
      usuario,
      deporte,
      parametroRendimiento,
    });

    if (!estadisticaDetalladaUsuario) throw new NotFoundException(`Relación con ID ${estadisticaDetalladaUsuario} no encontrada.`);

    try {
      await this.estadisticaDetalladaUsuarioRepository.save(estadisticaDetalladaUsuario);
      return { message: 'Relación actualizada exitosamente.', data: estadisticaDetalladaUsuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_estadistica_detallada: string): Promise<ResponseMessage<EstadisticaDetalladaUsuario>> {
    const estadisticaDetalladaUsuario = await this.estadisticaDetalladaUsuarioRepository.findOneBy({ id_estadistica_detallada });

    if (!estadisticaDetalladaUsuario) throw new NotFoundException(`Relación con ID ${id_estadistica_detallada} no encontrada.`);

    try {
      await this.estadisticaDetalladaUsuarioRepository.remove(estadisticaDetalladaUsuario);
      return { message: 'Relación eliminada exitosamente.', data: estadisticaDetalladaUsuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
