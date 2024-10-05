import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }


  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<Usuario[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
  
      const usuarios = await this.usuarioRepository.find({
        take: limit,
        skip: offset,
        relations: {
          equipos: true,
          deportesPosicionesUsuarios: {
            deporte: true,  // Incluye la relación con Deporte
            posicion: true  // Incluye la relación con Posición
          },
        },
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
        relations: ['equipos', 'deportesPosicionesUsuarios.deporte', 'deportesPosicionesUsuarios.posicion'],
      });
    } else {
      const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario');
      usuario = await queryBuilder
        .leftJoinAndSelect('usuario.equipos', 'equipos')
        .leftJoinAndSelect('usuario.deportesPosicionesUsuarios', 'deportesPosicionesUsuarios')
        .leftJoinAndSelect('deportesPosicionesUsuarios.deporte', 'deporte')
        .leftJoinAndSelect('deportesPosicionesUsuarios.posicion', 'posicion')
        .where('UPPER(usuario.nombre) LIKE :term', { term: `%${term.toUpperCase()}%` })
        .getOne();
    }
  
    if (!usuario) throw new NotFoundException(`Usuario no encontrado.`);
  
    return { message: 'Registro encontrado.', data: usuario };
  }
}
