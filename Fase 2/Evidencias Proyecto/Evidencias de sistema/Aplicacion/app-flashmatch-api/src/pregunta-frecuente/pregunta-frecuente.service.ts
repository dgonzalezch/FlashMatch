import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreguntaFrecuente } from './entities/pregunta-frecuente.entity';
import { CreatePreguntaFrecuenteDto } from './dto/create-pregunta-frecuente.dto';
import { UpdatePreguntaFrecuenteDto } from './dto/update-pregunta-frecuente.dto';
import { ResponseMessage } from 'src/common/interfaces/response.interface';

@Injectable()
export class PreguntaFrecuenteService {
  constructor(
    @InjectRepository(PreguntaFrecuente)
    private readonly preguntaFrecuenteRepository: Repository<PreguntaFrecuente>,
  ) {}

  async create(createPreguntaFrecuenteDto: CreatePreguntaFrecuenteDto): Promise<PreguntaFrecuente> {
    const nuevaPregunta = this.preguntaFrecuenteRepository.create(createPreguntaFrecuenteDto);
    return this.preguntaFrecuenteRepository.save(nuevaPregunta);
  }

  async findAll(): Promise<ResponseMessage<PreguntaFrecuente[]>> {
    
    const faqs = await this.preguntaFrecuenteRepository.find();

    return { message: 'Registros obtenidos exitosamente.', data: faqs };
  }

  async findOne(id: string): Promise<PreguntaFrecuente> {
    const pregunta = await this.preguntaFrecuenteRepository.findOne({ where: { id_pregunta_frecuente: id } });
    if (!pregunta) {
      throw new NotFoundException(`Pregunta frecuente con ID ${id} no encontrada.`);
    }
    return pregunta;
  }

  async update(id: string, updatePreguntaFrecuenteDto: UpdatePreguntaFrecuenteDto): Promise<PreguntaFrecuente> {
    const pregunta = await this.findOne(id);
    Object.assign(pregunta, updatePreguntaFrecuenteDto);
    return this.preguntaFrecuenteRepository.save(pregunta);
  }

  async remove(id: string): Promise<void> {
    const pregunta = await this.findOne(id);
    await this.preguntaFrecuenteRepository.remove(pregunta);
  }
}
