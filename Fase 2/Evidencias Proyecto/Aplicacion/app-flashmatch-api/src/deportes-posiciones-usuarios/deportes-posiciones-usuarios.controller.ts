import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeportesPosicionesUsuariosService } from './deportes-posiciones-usuarios.service';
import { CreateDeportesPosicionesUsuarioDto } from './dto/create-deporte-posicion-usuario.dto';
import { UpdateDeportesPosicionesUsuarioDto } from './dto/update-deporte-posicion-usuario.dto';

@Controller('deportes-posiciones-usuarios')
export class DeportesPosicionesUsuariosController {
  constructor(private readonly deportesPosicionesUsuariosService: DeportesPosicionesUsuariosService) {}

  @Post()
  create(@Body() createDeportesPosicionesUsuarioDto: CreateDeportesPosicionesUsuarioDto) {
    return this.deportesPosicionesUsuariosService.create(createDeportesPosicionesUsuarioDto);
  }

  @Get()
  findAll() {
    return this.deportesPosicionesUsuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deportesPosicionesUsuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeportesPosicionesUsuarioDto: UpdateDeportesPosicionesUsuarioDto) {
    return this.deportesPosicionesUsuariosService.update(+id, updateDeportesPosicionesUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deportesPosicionesUsuariosService.remove(+id);
  }
}
