import { Controller, Get, Post, Body, Patch, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateDeportePosicionUsuarioDto } from './dto/create-deporte-posicion-usuario.dto';  // Asegúrate de tener este DTO para el request
import { CreateEstadisticaDetalladaUsuarioDto } from './dto/create-estadistica-detallada-usuario.dto';  // Asegúrate de tener este DTO para el request

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.usuarioService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(
    @Param('term') term: string
  ) {
    return this.usuarioService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  // Endpoint para añadir una nueva relación deporte-posicion al usuario
  @Post(':id/deporte-posicion')
  addDeportePosicionUsuario(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createDeportePosicionUsuarioDto: CreateDeportePosicionUsuarioDto
  ) {
    const { deporte_id, deporte_posicion_id } = createDeportePosicionUsuarioDto;
    return this.usuarioService.addDeportePosicionUsuario(id, deporte_id, deporte_posicion_id);
  }

  // Endpoint para añadir una nueva estadística detallada al usuario
  @Post(':id/estadistica-detallada')
  addEstadisticaDetalladaUsuario(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createEstadisticaDetalladaUsuarioDto: CreateEstadisticaDetalladaUsuarioDto
  ) {
    const { deporte_id, parametro_rendimiento_id, parametro_valor } = createEstadisticaDetalladaUsuarioDto;
    return this.usuarioService.addEstadisticaDetalladaUsuario(id, deporte_id, parametro_rendimiento_id, parametro_valor);
  }
}
