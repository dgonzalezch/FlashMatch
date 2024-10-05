import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { DeportesPosicionesService } from './deportes-posiciones.service';
import { CreateDeportePosicionDto } from './dto/create-deporte-posicion.dto';
import { UpdateDeportePosicionDto } from './dto/update-deporte-posicion.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('deportes-posiciones')
export class DeportesPosicionesController {
  constructor(private readonly deportesPosicionesService: DeportesPosicionesService) {}

  @Post()
  create(@Body() createDeportePosicionDto: CreateDeportePosicionDto) {
    return this.deportesPosicionesService.create(createDeportePosicionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.deportesPosicionesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.deportesPosicionesService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeportePosicionDto: UpdateDeportePosicionDto) {
    return this.deportesPosicionesService.update(id, updateDeportePosicionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deportesPosicionesService.remove(id);
  }
}
