import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { CreateDisponibilidadCanchaDto } from './dto/create-disponibilidad-cancha.dto'; // DTO para disponibilidad
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancha } from './entities/cancha.entity';
import { DisponibilidadCancha } from './entities/disponibilidad-cancha.entity'; // Entidad de disponibilidad
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { MaterialCancha } from 'src/material-cancha/entities/material-cancha.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import * as geolib from 'geolib';

@Injectable()
export class CanchaService {
  private readonly logger = new Logger('CanchaService');

  constructor(
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
    @InjectRepository(DisponibilidadCancha)
    private readonly disponibilidadRepository: Repository<DisponibilidadCancha>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    @InjectRepository(MaterialCancha)
    private readonly materialCanchaRepository: Repository<MaterialCancha>,
    private readonly errorHandlingService: ErrorHandlingService
  ) { }

  async create(createCanchaDto: CreateCanchaDto): Promise<ResponseMessage<Cancha>> {
    const { deporte_id, administrador_cancha_id, material_cancha_id, disponibilidadCancha } = createCanchaDto;

    const deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
    const materialCancha = await this.materialCanchaRepository.findOneBy({ id_material_cancha: material_cancha_id });
    const usuario = await this.usuarioRepository.findOneBy({ id_usuario: administrador_cancha_id });

    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    if (!materialCancha) throw new NotFoundException(`Material cancha con ID ${material_cancha_id} no encontrado.`);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${administrador_cancha_id} no encontrado.`);

    try {
      // Crear la cancha primero
      const cancha = this.canchaRepository.create({
        ...createCanchaDto,
        deporte: deporte,
        material: materialCancha,
        administrador: usuario,
      });

      await this.canchaRepository.save(cancha);

      // Si hay disponibilidades, guardarlas
      if (disponibilidadCancha && disponibilidadCancha.length > 0) {
        for (const disponibilidad of disponibilidadCancha) {
          for (const horario of disponibilidad.horarios) {
            // Solo guardar los horarios seleccionados
            if (horario.seleccionada) {
              const nuevaDisponibilidad = this.disponibilidadRepository.create({
                dia_semana: disponibilidad.dia,
                prefijo: disponibilidad.prefijo,
                nombre: disponibilidad.nombre,
                hora: horario.hora,
                disponible: true,  // Asumimos que los horarios seleccionados están disponibles
                cancha: cancha, // Relacionar con la cancha recién creada
              });
              await this.disponibilidadRepository.save(nuevaDisponibilidad);
            }
          }
        }
      }

      return { message: 'Cancha y disponibilidad creadas exitosamente.', data: cancha };
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
          administrador: true,
          material: true,
          imagenes: true,
          disponibilidad: true,
          reservas: true
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
        relations: ['administrador_cancha', 'deporte', 'material', 'imagenes'],
      });
    } else {
      const queryBuilder = this.canchaRepository.createQueryBuilder('cancha');
      cancha = await queryBuilder
        .leftJoinAndSelect('cancha.administrador_cancha', 'administrador')
        .leftJoinAndSelect('cancha.deporte', 'deporte')
        .leftJoinAndSelect('cancha.material', 'material_cancha')
        .leftJoinAndSelect('cancha.imagenes', 'imagenes_cancha')
        .where('(UPPER(cancha.nombre_cancha) = :nombre OR LOWER(cancha.nombre_cancha) = :logo OR UPPER(deporte.nombre) = :deporteNombre)', {
          nombre: term.toUpperCase(),
          logo: term.toLowerCase(),
          deporteNombre: term.toUpperCase(),
          rangoEdadMinima: Number(term),
          rangoEdadMaxima: Number(term),
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
      administrador: usuario,
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

  async findAvailableCanchas({ latitud, longitud, fecha, hora }): Promise<ResponseMessage<Cancha[]>> {
    const diaSemana = new Date(fecha).getDay();
    const horaConsulta = `${hora}:00`;

    const canchas = await this.canchaRepository.find({
      relations: ['disponibilidad'],
    });

    const canchasDisponibles = canchas.filter(cancha => {
      const disponibilidad = cancha.disponibilidad.find(d =>
        d.dia_semana === diaSemana && d.hora === horaConsulta && d.disponible
      );

      if (!disponibilidad) return false;

      // Calcular distancia con geolib
      const distancia = geolib.getDistance(
        { latitude: latitud, longitude: longitud },
        { latitude: cancha.latitud, longitude: cancha.longitud },
      );

      return distancia <= 10000; // 10 km en metros
    });

    return { message: 'Canchas disponibles encontradas.', data: canchasDisponibles };
  }
}
