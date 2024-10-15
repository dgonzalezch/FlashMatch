import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { TiposPartidosService } from './tipos-partidos.service';
import { CreateTipoPartidoDto } from './dto/create-tipo-partido.dto';
import { UpdateTipoPartidoDto } from './dto/update-tipo-partido.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tipos-partidos')
export class TiposPartidosController {
  constructor(private readonly tiposPartidosService: TiposPartidosService) {}

  @Post()
  create(@Body() createTipoPartidoDto: CreateTipoPartidoDto) {
    return this.tiposPartidosService.create(createTipoPartidoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tiposPartidosService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.tiposPartidosService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipoPartidoDto: UpdateTipoPartidoDto) {
    return this.tiposPartidosService.update(id, updateTipoPartidoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiposPartidosService.remove(id);
  }
}
