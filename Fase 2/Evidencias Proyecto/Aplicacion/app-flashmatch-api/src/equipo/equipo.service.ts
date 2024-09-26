import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipoService {
  private readonly logger = new Logger('EquipoService');

  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>,
  ) { }

  async create(createEquipoDto: CreateEquipoDto) {
    try {
      const deporte = this.equipoRepository.create(createEquipoDto);
      await this.equipoRepository.save(deporte);

      return { data: deporte, message: 'Equipo creado' }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return `This action returns all equipo`;
  }

  findOne(id: string) {
    return `This action returns a #${id} equipo`;
  }

  update(id: string, updateEquipoDto: UpdateEquipoDto) {
    return `This action updates a #${id} equipo`;
  }

  remove(id: string) {
    return `This action removes a #${id} equipo`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    // this.logger.error(error);
    throw error;
  }
}
