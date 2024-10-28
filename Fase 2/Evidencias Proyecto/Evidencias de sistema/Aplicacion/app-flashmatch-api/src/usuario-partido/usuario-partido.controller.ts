import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioPartidoService } from './usuario-partido.service';
import { CreateUsuarioPartidoDto } from './dto/create-usuario-partido.dto';
import { UpdateUsuarioPartidoDto } from './dto/update-usuario-partido.dto';

@Controller('usuario-partido')
export class UsuarioPartidoController {
  constructor(private readonly usuarioPartidoService: UsuarioPartidoService) {}

  @Post()
  create(@Body() createUsuarioPartidoDto: CreateUsuarioPartidoDto) {
    return this.usuarioPartidoService.create(createUsuarioPartidoDto);
  }

  @Get()
  findAll() {
    return this.usuarioPartidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioPartidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioPartidoDto: UpdateUsuarioPartidoDto) {
    return this.usuarioPartidoService.update(+id, updateUsuarioPartidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioPartidoService.remove(+id);
  }
}
