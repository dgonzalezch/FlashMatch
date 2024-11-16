import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { TipoEmparejamientoService } from './tipo-emparejamiento.service';
import { CreateTipoEmparejamientoDto } from './dto/create-tipo-emparejamiento.dto';
import { UpdateTipoEmparejamientoDto } from './dto/update-tipo-emparejamiento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('tipo-emparejamiento')
export class TipoEmparejamientoController {
  constructor(private readonly tipoEmparejamientoService: TipoEmparejamientoService) {}

  @Post()
  create(@Body() createTipoEmparejamientoDto: CreateTipoEmparejamientoDto) {
    return this.tipoEmparejamientoService.create(createTipoEmparejamientoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tipoEmparejamientoService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.tipoEmparejamientoService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTipoEmparejamientoDto: UpdateTipoEmparejamientoDto) {
    return this.tipoEmparejamientoService.update(id, updateTipoEmparejamientoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoEmparejamientoService.remove(id);
  }
}
