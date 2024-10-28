import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsuarioPartidoDto } from './dto/create-usuario-partido.dto';
import { UpdateUsuarioPartidoDto } from './dto/update-usuario-partido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioPartido } from './entities/usuario-partido.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Partido } from 'src/partido/entities/partido.entity';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class UsuarioPartidoService {
  private readonly logger = new Logger('UsuarioPartidoService');

  constructor(
    @InjectRepository(UsuarioPartido)
    private readonly usuarioPartidoRepository: Repository<UsuarioPartido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createUsuarioPartidoDto: CreateUsuarioPartidoDto): Promise<ResponseMessage<UsuarioPartido>> {
    const { usuario_id, partido_id } = createUsuarioPartidoDto;

    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: usuario_id });
    const partido = await this.partidoRepository.findOneBy({ id_partido: partido_id });

    if (!usuario) throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado.`);
    if (!partido) throw new NotFoundException(`Partido con ID ${partido_id} no encontrado.`);

    try {
      const usuarioPartido = this.usuarioPartidoRepository.create({
        ...createUsuarioPartidoDto,
        usuario: usuario,
        partido: partido
      });

      await this.usuarioPartidoRepository.save(usuarioPartido);
      return { message: 'Usuario unido exitosamente al partido.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<UsuarioPartido[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const usuarioParitdo = await this.usuarioPartidoRepository.find({
        take: limit,
        skip: offset,
        relations: {
          usuario: true,
          partido: true
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: usuarioParitdo };
    } catch (error) {
      this.logger.error('Error al obtener los usuarios en partidos.', error);
      throw new InternalServerErrorException('Error al obtener los usuarios en partidos, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<UsuarioPartido>> {
    let usuarioPartido: UsuarioPartido;

    if (isUUID(term)) {
      usuarioPartido = await this.usuarioPartidoRepository.findOne({
        where: { id_usuario_partido: term },
        // relations: ['deporte'],
      });
    } else {
      usuarioPartido = await this.usuarioPartidoRepository
        .createQueryBuilder('deportePosicion')
        .leftJoinAndSelect('deportePosicion.deporte', 'deporte') // Relación con 'deporte'
        .where('UPPER(deportePosicion.nombre) = :term OR UPPER(deporte.nombre) = :term', {
          term: term.toUpperCase()
        })
        .getOne();
    }

    if (!usuarioPartido) throw new NotFoundException(`Usuario partido no encontrada.`);

    return { message: 'Registro encontrado.', data: usuarioPartido };
  }

  async update(id_usuario_partido: string, updateUsuarioPartidoDto: UpdateUsuarioPartidoDto): Promise<ResponseMessage<UsuarioPartido>> {
    const { usuario_id, partido_id } = updateUsuarioPartidoDto;

    let usuario: Usuario;
    let partido: Partido;

    if (usuario) {
      usuario = await this.usuarioRepository.findOneBy({ id_usuario: usuario_id });
      if (!usuario) throw new NotFoundException(`Usuario con ID ${usuario_id} no encontrado.`);
    }

    if (partido) {
      partido = await this.partidoRepository.findOneBy({ id_partido: partido_id });
      if (!partido) throw new NotFoundException(`Partido con ID ${partido_id} no encontrado.`);
    }

    const usuarioPartido = await this.usuarioPartidoRepository.preload({
      id_usuario_partido: id_usuario_partido,
      ...UpdateUsuarioPartidoDto,
      usuario: usuario,
      partido: partido
    });

    if (!usuarioPartido) throw new NotFoundException(`Usuario partido con ID ${id_usuario_partido} no encontrado.`);

    try {
      await this.usuarioPartidoRepository.save(usuarioPartido);
      return { message: 'Usuario partido actualizado exitosamente.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_usuario_partido: string): Promise<ResponseMessage<UsuarioPartido>> {
    try {
      const usuarioPartido = await this.usuarioPartidoRepository.findOneBy({ id_usuario_partido: id_usuario_partido });

      if (!usuarioPartido) throw new NotFoundException(`Usuario partido con ID ${id_usuario_partido} no se pudo eliminar porque no existe en la base de datos.`);

      await this.usuarioPartidoRepository.remove(usuarioPartido);
      return { message: 'Usuario partido eliminado exitosamente.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async isUserAvailableForMatch(userId: string, fecha_partido: Date): Promise<boolean> {
    const existingMatch = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: userId },
        partido: { fecha_partido: fecha_partido },
      },
      relations: ['partido'],
    });
  
    return !existingMatch; // Retorna true si el usuario no tiene partidos en ese horario
  }

  async joinUserToMatch(userId: string, partidoId: string): Promise<ResponseMessage<UsuarioPartido>> {
    const partido = await this.partidoRepository.findOneBy({ id_partido: partidoId });
    if (!partido) throw new NotFoundException(`Partido con ID ${partidoId} no encontrado.`);
    // Validaciones
    if (new Date(partido.fecha_partido) <= new Date()) {
      throw new BadRequestException('No se puede unir a un partido que ya ha pasado.');
    }

    const currentPlayers = await this.usuarioPartidoRepository.count({
      where: { partido: { id_partido: partidoId }, estado: 'confirmado' },
    });
  
    if (currentPlayers >= partido.jugadores_requeridos) {
      throw new BadRequestException('Este partido ya tiene el máximo de jugadores.');
    }
  
    if (partido.estado !== 'confirmado' && partido.estado !== 'abierto') {
      throw new BadRequestException('Este partido no está abierto para nuevos jugadores.');
    }

    const existingUserInMatch = await this.usuarioPartidoRepository.findOne({
      where: { usuario: { id_usuario: userId }, partido: { id_partido: partidoId } },
    });
  
    if (existingUserInMatch) {
      throw new BadRequestException('El usuario ya está unido a este partido.');
    }
  
    const isAvailable = await this.isUserAvailableForMatch(userId, partido.fecha_partido);
    if (!isAvailable) throw new BadRequestException('El usuario ya tiene un partido a la misma hora y día.');
  
    // Unión al partido
    const usuarioPartido = this.usuarioPartidoRepository.create({
      usuario: { id_usuario: userId },
      partido: partido,
      estado: 'pendiente',
    });
  
    try {
      await this.usuarioPartidoRepository.save(usuarioPartido);
      return { message: 'Usuario unido al partido exitosamente.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async removeUserFromMatch(userId: string, partidoId: string): Promise<ResponseMessage<string>> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: userId },
        partido: { id_partido: partidoId },
      },
    });
  
    if (!usuarioPartido) {
      throw new NotFoundException(`Usuario no está unido al partido.`);
    }
  
    try {
      await this.usuarioPartidoRepository.remove(usuarioPartido);
      return { message: 'Usuario eliminado del partido exitosamente.', data: 'Success' };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async leaveMatch(userId: string, partidoId: string): Promise<ResponseMessage<UsuarioPartido>> {
    const usuarioPartido = await this.usuarioPartidoRepository.findOne({
      where: {
        usuario: { id_usuario: userId },
        partido: { id_partido: partidoId },
      },
    });
  
    if (!usuarioPartido) {
      throw new NotFoundException(`Usuario no está unido al partido.`);
    }
  
    try {
      usuarioPartido.estado = 'cancelado';
      await this.usuarioPartidoRepository.save(usuarioPartido);
      return { message: 'Usuario ha salido del partido exitosamente.', data: usuarioPartido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }  
}
