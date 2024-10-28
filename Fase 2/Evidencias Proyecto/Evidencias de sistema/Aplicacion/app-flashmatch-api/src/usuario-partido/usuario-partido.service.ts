import { Injectable } from '@nestjs/common';
import { CreateUsuarioPartidoDto } from './dto/create-usuario-partido.dto';
import { UpdateUsuarioPartidoDto } from './dto/update-usuario-partido.dto';

@Injectable()
export class UsuarioPartidoService {
  create(createUsuarioPartidoDto: CreateUsuarioPartidoDto) {
    return 'This action adds a new usuarioPartido';
  }

  findAll() {
    return `This action returns all usuarioPartido`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioPartido`;
  }

  update(id: number, updateUsuarioPartidoDto: UpdateUsuarioPartidoDto) {
    return `This action updates a #${id} usuarioPartido`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioPartido`;
  }
}
