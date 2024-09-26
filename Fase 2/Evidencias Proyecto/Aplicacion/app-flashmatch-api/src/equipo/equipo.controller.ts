import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.equipoService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.equipoService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equipoService.update(id, updateEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.equipoService.remove(id);
  }
}
