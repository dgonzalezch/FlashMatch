import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { EstadisticasDetalladasUsuariosService } from './estadisticas-detalladas-usuarios.service';
import { UpdateEstadisticaDetalladaUsuarioDto } from './dto/update-estadistica-detallada-usuario.dto';
import { CreateEstadisticaDetalladaUsuarioDto } from './dto/create-estadistica-detallada-usuario.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('estadisticas-detalladas-usuarios')
export class EstadisticasDetalladasUsuariosController {
  constructor(private readonly estadisticasDetalladasUsuariosService: EstadisticasDetalladasUsuariosService) {}

  @Post()
  create(@Body() createEstadisticaDetalladaUsuarioDto: CreateEstadisticaDetalladaUsuarioDto) {
    return this.estadisticasDetalladasUsuariosService.create(createEstadisticaDetalladaUsuarioDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.estadisticasDetalladasUsuariosService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.estadisticasDetalladasUsuariosService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEstadisticaDetalladaUsuarioDto: UpdateEstadisticaDetalladaUsuarioDto) {
    return this.estadisticasDetalladasUsuariosService.update(id, updateEstadisticaDetalladaUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.estadisticasDetalladasUsuariosService.remove(id);
  }
}
