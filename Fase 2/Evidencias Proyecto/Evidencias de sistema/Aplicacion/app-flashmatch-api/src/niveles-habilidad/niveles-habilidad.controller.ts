import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { NivelesHabilidadService } from './niveles-habilidad.service';
import { CreateNivelHabilidadDto } from './dto/create-nivel-habilidad.dto';
import { UpdateNivelHabilidadDto } from './dto/update-nivel-habilidad.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('niveles-habilidad')
export class NivelesHabilidadController {
  constructor(private readonly nivelesHabilidadService: NivelesHabilidadService) {}

  @Post()
  create(@Body() createNivelHabilidadDto: CreateNivelHabilidadDto) {
    return this.nivelesHabilidadService.create(createNivelHabilidadDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.nivelesHabilidadService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.nivelesHabilidadService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateNivelHabilidadDto: UpdateNivelHabilidadDto) {
    return this.nivelesHabilidadService.update(id, updateNivelHabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.nivelesHabilidadService.remove(id);
  }
}
