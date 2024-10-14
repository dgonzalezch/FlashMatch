import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseUUIDPipe } from '@nestjs/common';
import { DeportesService } from './deportes.service';
import { CreateDeporteDto } from './dto/create-deporte.dto';
import { UpdateDeporteDto } from './dto/update-deporte.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('deportes')
export class DeportesController {
  constructor(private readonly deportesService: DeportesService) { }

  @Post()
  create(@Body() createDeporteDto: CreateDeporteDto) {
    return this.deportesService.create(createDeporteDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.deportesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.deportesService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeporteDto: UpdateDeporteDto) {
    return this.deportesService.update(id, updateDeporteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deportesService.remove(id);
  }
}
