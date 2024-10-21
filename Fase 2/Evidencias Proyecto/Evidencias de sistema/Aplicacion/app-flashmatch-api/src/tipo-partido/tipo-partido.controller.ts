import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { TipoPartidoService } from './tipo-partido.service';
import { CreateTipoPartidoDto } from './dto/create-tipo-partido.dto';
import { UpdateTipoPartidoDto } from './dto/update-tipo-partido.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tipo-partido')
export class TipoPartidoController {
  constructor(private readonly tipoPartidoService: TipoPartidoService) {}

  @Post()
  create(@Body() createTipoPartidoDto: CreateTipoPartidoDto) {
    return this.tipoPartidoService.create(createTipoPartidoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tipoPartidoService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.tipoPartidoService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipoPartidoDto: UpdateTipoPartidoDto) {
    return this.tipoPartidoService.update(id, updateTipoPartidoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoPartidoService.remove(id);
  }
}
