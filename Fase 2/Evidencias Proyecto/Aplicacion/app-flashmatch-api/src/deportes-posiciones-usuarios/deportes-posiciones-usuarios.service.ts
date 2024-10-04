import { Injectable } from '@nestjs/common';
import { CreateDeportesPosicionesUsuarioDto } from './dto/create-deporte-posicion-usuario.dto';
import { UpdateDeportesPosicionesUsuarioDto } from './dto/update-deporte-posicion-usuario.dto';

@Injectable()
export class DeportesPosicionesUsuariosService {
  create(createDeportesPosicionesUsuarioDto: CreateDeportesPosicionesUsuarioDto) {
    return 'This action adds a new deportesPosicionesUsuario';
  }

  findAll() {
    return `This action returns all deportesPosicionesUsuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deportesPosicionesUsuario`;
  }

  update(id: number, updateDeportesPosicionesUsuarioDto: UpdateDeportesPosicionesUsuarioDto) {
    return `This action updates a #${id} deportesPosicionesUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} deportesPosicionesUsuario`;
  }
}
