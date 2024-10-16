import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { TiposEmparejamientosService } from './tipos-emparejamientos.service';
import { CreateTipoEmparejamientoDto } from './dto/create-tipo-emparejamiento.dto';
import { UpdateTipoEmparejamientoDto } from './dto/update-tipo-emparejamiento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tipos-emparejamientos')
export class TiposEmparejamientosController {
  constructor(private readonly tiposEmparejamientosService: TiposEmparejamientosService) {}

  @Post()
  create(@Body() createTipoEmparejamientoDto: CreateTipoEmparejamientoDto) {
    return this.tiposEmparejamientosService.create(createTipoEmparejamientoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tiposEmparejamientosService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.tiposEmparejamientosService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipoEmparejamientoDto: UpdateTipoEmparejamientoDto) {
    return this.tiposEmparejamientosService.update(id, updateTipoEmparejamientoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tiposEmparejamientosService.remove(id);
  }
}
