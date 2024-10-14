import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) { }

  @Post()
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equiposService.create(createEquipoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.equiposService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.equiposService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equiposService.update(id, updateEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.equiposService.remove(id);
  }
}
