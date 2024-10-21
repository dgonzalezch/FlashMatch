import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { EstadisticaDetalladaUsuarioService } from './estadistica-detallada-usuario.service';
import { UpdateEstadisticaDetalladaUsuarioDto } from './dto/update-estadistica-detallada-usuario.dto';
import { CreateEstadisticaDetalladaUsuarioDto } from './dto/create-estadistica-detallada-usuario.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('estadistica-detallada-usuario')
export class EstadisticaDetalladaUsuarioController {
  constructor(private readonly estadisticaDetalladaUsuarioService: EstadisticaDetalladaUsuarioService) {}

  @Post()
  create(@Body() createEstadisticaDetalladaUsuarioDto: CreateEstadisticaDetalladaUsuarioDto) {
    return this.estadisticaDetalladaUsuarioService.create(createEstadisticaDetalladaUsuarioDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.estadisticaDetalladaUsuarioService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.estadisticaDetalladaUsuarioService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEstadisticaDetalladaUsuarioDto: UpdateEstadisticaDetalladaUsuarioDto) {
    return this.estadisticaDetalladaUsuarioService.update(id, updateEstadisticaDetalladaUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.estadisticaDetalladaUsuarioService.remove(id);
  }
}
