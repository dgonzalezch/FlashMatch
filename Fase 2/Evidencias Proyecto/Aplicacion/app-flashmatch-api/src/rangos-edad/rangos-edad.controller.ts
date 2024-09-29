import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { RangosEdadService } from './rangos-edad.service';
import { CreateRangoEdadDto } from './dto/create-rango-edad.dto';
import { UpdateRangoEdadDto } from './dto/update-rango-edad.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('rangos-edad')
export class RangosEdadController {
  constructor(private readonly rangosEdadService: RangosEdadService) { }

  @Post()
  create(@Body() createRangoEdadDto: CreateRangoEdadDto) {
    return this.rangosEdadService.create(createRangoEdadDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rangosEdadService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.rangosEdadService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRangoEdadDto: UpdateRangoEdadDto) {
    return this.rangosEdadService.update(id, updateRangoEdadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rangosEdadService.remove(id);
  }
}
