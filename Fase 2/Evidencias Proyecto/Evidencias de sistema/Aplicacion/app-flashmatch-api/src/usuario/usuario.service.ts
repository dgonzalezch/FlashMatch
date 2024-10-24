import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Repository } from 'typeorm';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { DeportePosicion } from 'src/deporte-posicion/entities/deporte-posicion.entity';
import { ParametroRendimiento } from 'src/parametro-rendimiento/entities/parametro-rendimiento.entity';
import { Usuario } from './entities/usuario.entity';
import { DeportePosicionUsuario } from './entities/deporte-posicion-usuario.entity';
import { EstadisticaDetalladaUsuario } from './entities/estadistica-detallada-usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger('UsuarioService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(DeportePosicionUsuario)
    private readonly deportePosicionUsuarioRepository: Repository<DeportePosicionUsuario>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    @InjectRepository(DeportePosicion)
    private readonly deportePosicionRepository: Repository<DeportePosicion>,
    @InjectRepository(EstadisticaDetalladaUsuario)
    private readonly estadisticaDetalladaUsuarioRepository: Repository<EstadisticaDetalladaUsuario>,
    @InjectRepository(ParametroRendimiento)
    private readonly parametroRendimientoRepository: Repository<ParametroRendimiento>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<Usuario[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const usuarios = await this.usuarioRepository.find({
        take: limit,
        skip: offset,
        relations: ['equipos', 'deportesPosicionesUsuarios.deportePosicion', 'estadisticasDetalladasUsuarios.parametroRendimiento'],
      });

      return { message: 'Registros obtenidos exitosamente.', data: usuarios };
    } catch (error) {
      this.logger.error('Error al obtener los usuarios.', error);
      throw new InternalServerErrorException('Error al obtener los usuarios, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<Usuario>> {
    let usuario: Usuario;

    if (isUUID(term)) {
      usuario = await this.usuarioRepository.findOne({
        where: { id_usuario: term },
        relations: ['equipos', 'deportesPosicionesUsuarios.deportePosicion', 'estadisticasDetalladasUsuarios.parametroRendimiento'],
      });
    } else {
      usuario = await this.usuarioRepository.createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.equipos', 'equipos')
        .leftJoinAndSelect('usuario.deportesPosicionesUsuarios', 'deportesPosicionesUsuarios')
        .leftJoinAndSelect('deportesPosicionesUsuarios.deporte', 'deporte')
        .leftJoinAndSelect('deportesPosicionesUsuarios.deportePosicion', 'deportePosicion')
        .leftJoinAndSelect('usuario.estadisticasDetalladasUsuarios', 'estadisticasDetalladasUsuarios')
        .leftJoinAndSelect('estadisticasDetalladasUsuarios.parametroRendimiento', 'parametroRendimiento')
        .where('UPPER(usuario.nombre) LIKE :term', { term: `%${term.toUpperCase()}%` })
        .getOne();
    }

    if (!usuario) throw new NotFoundException(`Usuario no encontrado.`);

    return { message: 'Registro encontrado.', data: usuario };
  }

  async update(id_usuario: string, updateUsuarioDto: UpdateUsuarioDto): Promise<ResponseMessage<Usuario>> {
    const usuario = await this.usuarioRepository.preload({
      id_usuario,
      ...updateUsuarioDto,
    });

    if (!usuario) throw new NotFoundException(`Usuario con id ${id_usuario} no encontrado.`);

    try {
      await this.usuarioRepository.save(usuario);
      return { message: 'Usuario actualizado exitosamente.', data: usuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  // Añadir Deporte y Posición al Usuario
  async addDeportePosicionUsuario(usuarioId: string, deporteId: string, posicionId: string): Promise<ResponseMessage<DeportePosicionUsuario>> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: usuarioId }, relations: ['deportesPosicionesUsuarios'] });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);

    const deporte = await this.deporteRepository.findOne({ where: { id_deporte: deporteId } });
    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporteId} no encontrado.`);

    const deportePosicion = await this.deportePosicionRepository.findOne({ where: { id_deporte_posicion: posicionId } });
    if (!deportePosicion) throw new NotFoundException(`Posición con ID ${posicionId} no encontrada.`);

    // Verificar si la relación ya existe
    const existeRelacion = usuario.deportesPosicionesUsuarios.some(dp => dp.deporte.id_deporte === deporteId && dp.deportePosicion.id_deporte_posicion === posicionId);
    if (existeRelacion) {
      throw new InternalServerErrorException(`El usuario ya tiene asignada esta posición en el deporte seleccionado.`);
    }

    // Crear la nueva relación
    const deportePosicionUsuario = this.deportePosicionUsuarioRepository.create({
      usuario,
      deporte,
      deportePosicion,
    });

    try {
      await this.deportePosicionUsuarioRepository.save(deportePosicionUsuario);
      return { message: 'Deporte y posición añadidos al usuario exitosamente.', data: deportePosicionUsuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  // Añadir Estadística Detallada al Usuario
  async addEstadisticaDetalladaUsuario(usuarioId: string, deporteId: string, parametroRendimientoId: string, valor: number): Promise<ResponseMessage<EstadisticaDetalladaUsuario>> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: usuarioId }, relations: ['estadisticasDetalladasUsuarios'] });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);

    const deporte = await this.deporteRepository.findOne({ where: { id_deporte: deporteId } });
    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporteId} no encontrado.`);

    const parametroRendimiento = await this.parametroRendimientoRepository.findOne({ where: { id_parametro_rendimiento: parametroRendimientoId } });
    if (!parametroRendimiento) throw new NotFoundException(`Parámetro de rendimiento con ID ${parametroRendimientoId} no encontrado.`);

    // Verificar si la estadística ya existe
    const existeEstadistica = usuario.estadisticasDetalladasUsuarios.some(est => est.deporte.id_deporte === deporteId && est.parametroRendimiento.id_parametro_rendimiento === parametroRendimientoId);
    if (existeEstadistica) {
      throw new InternalServerErrorException(`El usuario ya tiene asignada una estadística para este parámetro en el deporte seleccionado.`);
    }

    // Crear la nueva estadística
    const estadisticaDetalladaUsuario = this.estadisticaDetalladaUsuarioRepository.create({
      usuario,
      deporte,
      parametroRendimiento,
      parametro_valor: valor,
    });

    try {
      await this.estadisticaDetalladaUsuarioRepository.save(estadisticaDetalladaUsuario);
      return { message: 'Estadística añadida exitosamente al usuario.', data: estadisticaDetalladaUsuario };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}