import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeportesPosicionesService } from './deportes-posiciones.service';
import { CreateDeportesPosicioneDto } from './dto/create-deporte-posicion.dto';
import { UpdateDeportesPosicioneDto } from './dto/update-deporte-posicion.dto';

@Controller('deportes-posiciones')
export class DeportesPosicionesController {
  constructor(private readonly deportesPosicionesService: DeportesPosicionesService) {}

  @Post()
  create(@Body() createDeportesPosicioneDto: CreateDeportesPosicioneDto) {
    return this.deportesPosicionesService.create(createDeportesPosicioneDto);
  }

  @Get()
  findAll() {
    return this.deportesPosicionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deportesPosicionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeportesPosicioneDto: UpdateDeportesPosicioneDto) {
    return this.deportesPosicionesService.update(+id, updateDeportesPosicioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deportesPosicionesService.remove(+id);
  }
}
