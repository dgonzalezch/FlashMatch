import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
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
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { RangoEdad } from 'src/rango-edad/entities/rango-edad.entity';

@Injectable()
export class EquipoService {
  private readonly logger = new Logger('EquipoService');

  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    @InjectRepository(RangoEdad)
    private readonly rangoEdadRepository: Repository<RangoEdad>,
    private readonly errorHandlingService: ErrorHandlingService,
  ) { }

  async create(createEquipoDto: CreateEquipoDto): Promise<ResponseMessage<Equipo>> {
    const { creador_id, deporte_id, rango_edad_id } = createEquipoDto;

    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: creador_id });
    const deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
    const rangoEdad = await this.rangoEdadRepository.findOneBy({ id_rango_edad: rango_edad_id });

    if (!usuario) throw new NotFoundException(`Usuario con ID ${creador_id} no encontrado.`);
    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    if (!rangoEdad) throw new NotFoundException(`Rango edad con ID ${rango_edad_id} no encontrado.`);

    try {
      const equipo = this.equipoRepository.create({
        ...createEquipoDto,
        creador: usuario,
        deporte: deporte,
        rangoEdad: rangoEdad
      });

      await this.equipoRepository.save(equipo);
      return { message: 'Equipo creado exitosamente.', data: equipo };
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
        relations: {
          creador: true,
          deporte: true,
          rangoEdad: true
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: equipos };
    } catch (error) {
      this.logger.error('Error al obtener los equipos.', error);
      throw new InternalServerErrorException('Error al obtener los equipos, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<Equipo>> {
    let equipo: Equipo;

    if (isUUID(term)) {
      equipo = await this.equipoRepository.findOne({
        where: { id_equipo: term },
        relations: ['creador', 'deporte', 'rango'],
      });
    } else {
      const queryBuilder = this.equipoRepository.createQueryBuilder('equipo');
      equipo = await queryBuilder
        .leftJoinAndSelect('equipo.creador', 'creador')
        .leftJoinAndSelect('equipo.deporte', 'deporte')
        .leftJoinAndSelect('equipo.rango', 'rango')
        .where('(UPPER(equipo.nombre_equipo) = :nombre OR LOWER(equipo.logo_equipo) = :logo OR UPPER(deporte.nombre) = :deporteNombre OR rango.edad_minima = :rangoEdadMinima, OR rango.edad_maxima = :rangoEdadMaxima)',
        {
          nombre: term.toUpperCase(),
          logo: term.toLowerCase(),
          deporteNombre: term.toUpperCase(),
          rangoEdadMinima: Number(term),
          rangoEdadMaxima: Number(term)
        })
        .getOne();
    }

    if (!equipo) throw new NotFoundException(`Equipo no encontrado.`);

    return { message: 'Registro encontrado.', data: equipo };
  }

  async update(id_equipo: string, updateEquipoDto: UpdateEquipoDto): Promise<ResponseMessage<Equipo>> {
    const { creador_id, deporte_id, rango_edad_id } = updateEquipoDto;

    let usuario: Usuario;
    let deporte: Deporte;
    let rangoEdad: RangoEdad;

    if (creador_id) {
      usuario = await this.usuarioRepository.findOneBy({ id_usuario: creador_id });
      if (!usuario) throw new NotFoundException(`Usuario con ID ${creador_id} no encontrado.`);
    }

    if (deporte_id) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    }

    if (rango_edad_id) {
      rangoEdad = await this.rangoEdadRepository.findOneBy({ id_rango_edad: rango_edad_id });
      if (!deporte) throw new NotFoundException(`Rango edad con ID ${rango_edad_id} no encontrado.`);
    }

    const equipo = await this.equipoRepository.preload({
      id_equipo: id_equipo,
      ...updateEquipoDto,
      creador: usuario,
      deporte: deporte,
      rangoEdad: rangoEdad,
    });

    if (!equipo) throw new NotFoundException(`Equipo con ID ${id_equipo} no encontrado.`);

    try {
      await this.equipoRepository.save(equipo);
      return { message: 'Equipo actualizado exitosamente.', data: equipo };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_equipo: string): Promise<ResponseMessage<Equipo>> {
    try {
      const equipo = await this.equipoRepository.findOneBy({ id_equipo });

      if (!equipo) throw new NotFoundException(`Equipo con ID ${id_equipo} no se pudo eliminar porque no existe en la base de datos.`);

      await this.equipoRepository.remove(equipo);
      return { message: 'Equipo eliminado exitosamente.', data: equipo };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
