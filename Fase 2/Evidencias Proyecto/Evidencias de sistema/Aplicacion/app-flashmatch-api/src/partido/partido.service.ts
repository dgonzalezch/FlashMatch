import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { Partido } from './entities/partido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { NivelHabilidad } from 'src/nivel-habilidad/entities/nivel-habilidad.entity';
import { TipoEmparejamiento } from 'src/tipo-emparejamiento/entities/tipo-emparejamiento.entity';
import { RangoEdad } from 'src/rango-edad/entities/rango-edad.entity';
import { TipoPartido } from 'src/tipo-partido/entities/tipo-partido.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { isUUID } from 'class-validator';
import { ReservaCancha } from 'src/reserva/entities/reserva-cancha.entity';

@Injectable()
export class PartidoService {
  private readonly logger = new Logger('PartidoService');

  constructor(
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    @InjectRepository(Deporte)
    private readonly deporteRepository: Repository<Deporte>,
    @InjectRepository(NivelHabilidad)
    private readonly nivelHabilidadRepository: Repository<NivelHabilidad>,
    @InjectRepository(TipoEmparejamiento)
    private readonly tipoEmparejamientoRepository: Repository<TipoEmparejamiento>,
    @InjectRepository(RangoEdad)
    private readonly rangoEdadRepository: Repository<RangoEdad>,
    @InjectRepository(TipoPartido)
    private readonly tipoPartidoRepository: Repository<TipoPartido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(ReservaCancha)
    private readonly reservaCanchaRepository: Repository<ReservaCancha>,
    private readonly errorHandlingService: ErrorHandlingService
  ) { }


  async create(createPartidoDto: CreatePartidoDto): Promise<ResponseMessage<Partido>> {
    const { deporte_id, nivel_habilidad_id, tipo_emparejamiento_id, rango_edad_id, tipo_partido_id, creador_id } = createPartidoDto;

    const deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
    const nivelHabilidad = await this.nivelHabilidadRepository.findOneBy({ id_nivel_habilidad: nivel_habilidad_id });
    const tipoEmparejamiento = await this.tipoEmparejamientoRepository.findOneBy({ id_tipo_emparejamiento: tipo_emparejamiento_id });
    const rangoEdad = await this.rangoEdadRepository.findOneBy({ id_rango_edad: rango_edad_id });
    const tipoPartido = await this.tipoPartidoRepository.findOneBy({ id_tipo_partido: tipo_partido_id });
    const creador = await this.usuarioRepository.findOneBy({ id_usuario: creador_id });

    if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    if (!nivelHabilidad) throw new NotFoundException(`Nivel habilidad con ID ${nivel_habilidad_id} no encontrado.`);
    if (!tipoEmparejamiento) throw new NotFoundException(`Tipo emparejamiento con ID ${tipo_emparejamiento_id} no encontrado.`);
    if (!rangoEdad) throw new NotFoundException(`Rango edad con ID ${rango_edad_id} no encontrado.`);
    if (!tipoPartido) throw new NotFoundException(`Tipo partido con ID ${tipo_partido_id} no encontrado.`);
    if (!creador) throw new NotFoundException(`Usuario con ID ${creador_id} no encontrado.`);

    try {
      const fechaExpiracion = new Date(createPartidoDto.fecha_partido);
      fechaExpiracion.setHours(fechaExpiracion.getHours() - 1); // Configura la expiración para 1 hora antes del partido

      const partido = this.partidoRepository.create({
        ...createPartidoDto,
        deporte: deporte,
        nivelHabilidad: nivelHabilidad,
        tipoEmparejamiento: tipoEmparejamiento,
        rangoEdad: rangoEdad,
        tipoPartido: tipoPartido,
        creador: creador,
        estado: 'pendiente_reserva',
        jugadores_requeridos: deporte.cantidad_min_jugadores,
        jugadores_actuales: 1,
        fecha_expiracion_reserva: fechaExpiracion
      });

      await this.partidoRepository.save(partido);
      return { message: 'Partido creado exitosamente.', data: partido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseMessage<Partido[]>> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const partidos = await this.partidoRepository.find({
        take: limit,
        skip: offset,
        relations: {
          deporte: true,
          nivelHabilidad: true,
          tipoEmparejamiento: true,
          rangoEdad: true, 
          tipoPartido: true,
          creador: true,
        },
      });

      return { message: 'Registros obtenidos exitosamente.', data: partidos };
    } catch (error) {
      this.logger.error('Error al obtener los partidos.', error);
      throw new InternalServerErrorException('Error al obtener los partidos, por favor verifica los logs.');
    }
  }

  async findOne(term: string): Promise<ResponseMessage<Partido>> {
    let partido: Partido;
  
    if (isUUID(term)) {
      partido = await this.partidoRepository.findOne({
        where: { id_partido: term },
        relations: ['creador', 'deporte', 'nivelHabilidad', 'tipoEmparejamiento', 'rangoEdad', 'tipoPartido', 'reservas']
      });
    } else {
      const queryBuilder = this.partidoRepository.createQueryBuilder('partido');
      partido = await queryBuilder
        .leftJoinAndSelect('partido.creador', 'creador')
        .leftJoinAndSelect('partido.deporte', 'deporte')
        .leftJoinAndSelect('partido.nivelHabilidad', 'nivelHabilidad')
        .leftJoinAndSelect('partido.tipoEmparejamiento', 'tipoEmparejamiento')
        .leftJoinAndSelect('partido.rangoEdad', 'rangoEdad')
        .leftJoinAndSelect('partido.tipoPartido', 'tipoPartido')
        .leftJoinAndSelect('partido.reservas', 'reservas')
        .where('UPPER(deporte.nombre) = :deporteNombre', {
          deporteNombre: term.toUpperCase(),
        })
        .getOne();
    }
  
    if (!partido) throw new NotFoundException(`Partido no encontrado.`);
  
    return { message: 'Registro encontrado.', data: partido };
  }

  async update(id_partido: string, updatePartidoDto: UpdatePartidoDto): Promise<ResponseMessage<Partido>> {
    const { deporte_id, nivel_habilidad_id, tipo_emparejamiento_id, rango_edad_id, tipo_partido_id, creador_id } = updatePartidoDto;

    let deporte: Deporte;
    let nivelHabilidad: NivelHabilidad;
    let tipoEmparejamiento: TipoEmparejamiento;
    let rangoEdad: RangoEdad;
    let tipoPartido: TipoPartido;
    let creador: Usuario;

    if (deporte_id) {
      deporte = await this.deporteRepository.findOneBy({ id_deporte: deporte_id });
      if (!deporte) throw new NotFoundException(`Deporte con ID ${deporte_id} no encontrado.`);
    }

    if (nivel_habilidad_id) {
      nivelHabilidad = await this.nivelHabilidadRepository.findOneBy({ id_nivel_habilidad: nivel_habilidad_id });
      if (!nivelHabilidad) throw new NotFoundException(`Nivel habilidad con ID ${nivel_habilidad_id} no encontrado.`);
    }

    if (tipo_emparejamiento_id) {
      tipoEmparejamiento = await this.tipoEmparejamientoRepository.findOneBy({ id_tipo_emparejamiento: nivel_habilidad_id });
      if (!tipoEmparejamiento) throw new NotFoundException(`Tipo emparejamiento con ID ${nivel_habilidad_id} no encontrado.`);
    }

    if (rango_edad_id) {
      rangoEdad = await this.rangoEdadRepository.findOneBy({ id_rango_edad: rango_edad_id });
      if (!rangoEdad) throw new NotFoundException(`Rango edad con ID ${rango_edad_id} no encontrado.`);
    }

    if (tipo_partido_id) {
      tipoPartido = await this.tipoPartidoRepository.findOneBy({ id_tipo_partido: tipo_partido_id });
      if (!tipoPartido) throw new NotFoundException(`Tipo partido con ID ${tipo_partido_id} no encontrado.`);
    }

    if (creador_id) {
      creador = await this.usuarioRepository.findOneBy({ id_usuario: creador_id });
      if (!creador) throw new NotFoundException(`Usuario creador con ID ${creador_id} no encontrado.`);
    }

    const partido = await this.partidoRepository.preload({
      id_partido: id_partido,
      ...updatePartidoDto,
      deporte,
      nivelHabilidad,
      tipoEmparejamiento,
      rangoEdad,
      tipoPartido,
      creador,
    });
  
    if (!partido) throw new NotFoundException(`Partido con ID ${id_partido} no encontrado.`);
  
    // Lógica de actualización de jugadores y estado
    partido.jugadores_actuales = partido.jugadores_actuales || 1;
  
    // Verificar el estado de las reservas
    const reservaAceptada = await this.reservaCanchaRepository.findOne({
      where: { partido: { id_partido }, estado: 'aceptada' },
    });
  
    if (reservaAceptada) {
      partido.estado = 'confirmado';
    } else {
      const reservasPendientes = await this.reservaCanchaRepository.count({
        where: { partido: { id_partido }, estado: 'pendiente' },
      });
  
      partido.estado = reservasPendientes > 0 ? 'pendiente_confirmacion' : 'pendiente_reserva';
    }
  
    try {
      await this.partidoRepository.save(partido);
      return { message: 'Partido actualizado exitosamente.', data: partido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async remove(id_partido: string): Promise<ResponseMessage<Partido>> {
    try {
      const partido = await this.partidoRepository.findOneBy({ id_partido: id_partido });

      if (!partido) throw new NotFoundException(`Partido con ID ${id_partido} no se pudo eliminar porque no existe en la base de datos.`);

      await this.partidoRepository.remove(partido);
      return { message: 'Partido eliminado exitosamente.', data: partido };
    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }
}
