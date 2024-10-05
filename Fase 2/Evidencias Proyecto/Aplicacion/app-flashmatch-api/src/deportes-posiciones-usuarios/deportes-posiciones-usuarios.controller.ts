import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { DeportesPosicionesUsuariosService } from './deportes-posiciones-usuarios.service';
import { CreateDeportePosicionUsuarioDto } from './dto/create-deporte-posicion-usuario.dto';
import { UpdateDeportePosicionUsuarioDto } from './dto/update-deporte-posicion-usuario.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('deportes-posiciones-usuarios')
export class DeportesPosicionesUsuariosController {
  constructor(private readonly deportesPosicionesUsuariosService: DeportesPosicionesUsuariosService) {}

  @Post()
  create(@Body() createDeportePosicionUsuarioDto: CreateDeportePosicionUsuarioDto) {
    return this.deportesPosicionesUsuariosService.create(createDeportePosicionUsuarioDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // Aquí se reintroduce la lógica de paginación
    return this.deportesPosicionesUsuariosService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.deportesPosicionesUsuariosService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeportePosicionUsuarioDto: UpdateDeportePosicionUsuarioDto) {
    return this.deportesPosicionesUsuariosService.update(id, updateDeportePosicionUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deportesPosicionesUsuariosService.remove(id);
  }
}
