import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { RangoEdadService } from './rango-edad.service';
import { CreateRangoEdadDto } from './dto/create-rango-edad.dto';
import { UpdateRangoEdadDto } from './dto/update-rango-edad.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('rango-edad')
export class RangoEdadController {
  constructor(private readonly rangoEdadService: RangoEdadService) { }

  @Post()
  create(@Body() createRangoEdadDto: CreateRangoEdadDto) {
    return this.rangoEdadService.create(createRangoEdadDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rangoEdadService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.rangoEdadService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRangoEdadDto: UpdateRangoEdadDto) {
    return this.rangoEdadService.update(id, updateRangoEdadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rangoEdadService.remove(id);
  }
}
