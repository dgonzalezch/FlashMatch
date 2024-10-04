import { Injectable } from '@nestjs/common';
import { CreateDeportesPosicioneDto } from './dto/create-deporte-posicion.dto';
import { UpdateDeportesPosicioneDto } from './dto/update-deporte-posicion.dto';

@Injectable()
export class DeportesPosicionesService {
  create(createDeportesPosicioneDto: CreateDeportesPosicioneDto) {
    return 'This action adds a new deportesPosicione';
  }

  findAll() {
    return `This action returns all deportesPosiciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deportesPosicione`;
  }

  update(id: number, updateDeportesPosicioneDto: UpdateDeportesPosicioneDto) {
    return `This action updates a #${id} deportesPosicione`;
  }

  remove(id: number) {
    return `This action removes a #${id} deportesPosicione`;
  }
}
