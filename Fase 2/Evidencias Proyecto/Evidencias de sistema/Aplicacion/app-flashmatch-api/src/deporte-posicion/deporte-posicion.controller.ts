import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { DeportePosicionService } from './deporte-posicion.service';
import { CreateDeportePosicionDto } from './dto/create-deporte-posicion.dto';
import { UpdateDeportePosicionDto } from './dto/update-deporte-posicion.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('deporte-posicion')
export class DeportePosicionController {
  constructor(private readonly deportePosicionService: DeportePosicionService) {}

  @Post()
  create(@Body() createDeportePosicionDto: CreateDeportePosicionDto) {
    return this.deportePosicionService.create(createDeportePosicionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.deportePosicionService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.deportePosicionService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeportePosicionDto: UpdateDeportePosicionDto) {
    return this.deportePosicionService.update(id, updateDeportePosicionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deportePosicionService.remove(id);
  }
}
