import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { isUUID } from 'class-validator';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';

@Injectable()
export class EquiposService {
  private readonly logger = new Logger('EquiposService');

  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createEquipoDto: CreateEquipoDto): Promise<ResponseMessage<Equipo>> {
    const { id_creador, id_deporte } = createEquipoDto;

    // Validar que el creador y el deporte existan
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: id_creador });
    const deporte = await this.deporteRepository.findOneBy({ id_deporte });

    if (!usuario) throw new NotFoundException(`Usuario con ID ${id_creador} no encontrado.`);
    if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);

    try {
      const equipo = this.equipoRepository.create({
        ...createEquipoDto,
        creador: usuario,
        deporte: deporte,
      });

      await this.equipoRepository.save(equipo);
      return { message: 'Equipo creado exitosamente', data: equipo };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<Equipo[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const equipos = await this.equipoRepository.find({
        take: limit,
        skip: offset,
        // relations: {
        //   id_creador: true,
        //   id_deporte: true
        // },
      });

      return { message: 'Registros obtenidos exitosamente', data: equipos };
    } catch (error) {
      this.logger.error('Error al obtener los equipos', error);
      throw new InternalServerErrorException('Error al obtener los equipos, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<Equipo>> {
    let equipo: Equipo;

    if (isUUID(term)) {
      equipo = await this.equipoRepository.findOne({
        where: { id_equipo: term },
        relations: ['creador', 'deporte'],
      });
    } else {
      const queryBuilder = this.equipoRepository.createQueryBuilder('equipo');
      equipo = await queryBuilder
        .leftJoinAndSelect('equipo.creador', 'creador')
        .leftJoinAndSelect('equipo.deporte', 'deporte')
        .where('UPPER(equipo.nombre_equipo) = :nombre OR LOWER(equipo.logo_equipo) = :logo', {
          nombre: term.toUpperCase(),
          logo: term.toLowerCase(),
        })
        .getOne();
    }

    if (!equipo) throw new NotFoundException(`Equipo no encontrado.`);

    return { message: 'Registro encontrado', data: equipo };
  }

  async update(id_equipo: string, updateEquipoDto: UpdateEquipoDto): Promise<ResponseMessage<Equipo>> {
    const { id_creador, id_deporte } = updateEquipoDto;

    let usuario: Usuario;
    let deporte: Deporte;

    if (id_creador) {
      usuario = await this.usuarioRepository.findOneBy({ id_usuario: id_creador });
      if (!usuario) throw new NotFoundException(`Usuario con ID ${id_creador} no encontrado.`);
    }

    if (id_deporte) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${id_deporte} no encontrado.`);
    }

    const equipo = await this.equipoRepository.preload({
      id_equipo: id_equipo,
      ...updateEquipoDto,
      creador: usuario,
      deporte: deporte,
    });

    if (!equipo) throw new NotFoundException(`Equipo con ID ${id_equipo} no encontrado.`);

    try {
      await this.equipoRepository.save(equipo);
      return { message: 'Equipo actualizado exitosamente', data: equipo };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }


  async remove(id_equipo: string): Promise<ResponseMessage<Equipo>> {
    try {
      const equipo = await this.equipoRepository.findOneBy({ id_equipo });

      if (!equipo) throw new NotFoundException(`Equipo con ID ${id_equipo} no se pudo eliminar porque no existe en la base de datos.`);

      await this.equipoRepository.remove(equipo);
      return { message: 'Equipo eliminado exitosamente', data: equipo };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
