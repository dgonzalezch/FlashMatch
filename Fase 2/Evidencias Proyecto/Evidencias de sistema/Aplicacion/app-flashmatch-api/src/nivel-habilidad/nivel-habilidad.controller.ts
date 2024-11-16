import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { NivelHabilidadService } from './nivel-habilidad.service';
import { CreateNivelHabilidadDto } from './dto/create-nivel-habilidad.dto';
import { UpdateNivelHabilidadDto } from './dto/update-nivel-habilidad.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('nivel-habilidad')
export class NivelHabilidadController {
  constructor(private readonly nivelHabilidadService: NivelHabilidadService) {}

  @Post()
  create(@Body() createNivelHabilidadDto: CreateNivelHabilidadDto) {
    return this.nivelHabilidadService.create(createNivelHabilidadDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.nivelHabilidadService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.nivelHabilidadService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateNivelHabilidadDto: UpdateNivelHabilidadDto) {
    return this.nivelHabilidadService.update(id, updateNivelHabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.nivelHabilidadService.remove(id);
  }
}
