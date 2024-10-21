import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseUUIDPipe } from '@nestjs/common';
import { DeporteService } from './deporte.service';
import { CreateDeporteDto } from './dto/create-deporte.dto';
import { UpdateDeporteDto } from './dto/update-deporte.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('deporte')
export class DeporteController {
  constructor(private readonly deporteService: DeporteService) { }

  @Post()
  create(@Body() createDeporteDto: CreateDeporteDto) {
    return this.deporteService.create(createDeporteDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.deporteService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.deporteService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeporteDto: UpdateDeporteDto) {
    return this.deporteService.update(id, updateDeporteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deporteService.remove(id);
  }
}
