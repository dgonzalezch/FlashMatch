import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateDisponibilidadCanchaDto } from './dto/create-disponibilidad-cancha.dto';
import { UpdateDisponibilidadCanchaDto } from './dto/update-disponibilidad-cancha.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CanchasDisponiblesBodyDto } from './dto/canchas-disponibles-body.dto';

@Controller('cancha')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) { }

  @Post()
  create(
    @Body() createCanchaDto: CreateCanchaDto
  ) {
    return this.canchaService.create(createCanchaDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.canchaService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(
    @Param('term') term: string
  ) {
    return this.canchaService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCanchaDto: UpdateCanchaDto
  ) {
    return this.canchaService.update(id, updateCanchaDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.canchaService.remove(id);
  }

  @Post('disponibles')
  async findAvailableCanchas(
    @Body() body: CanchasDisponiblesBodyDto,
  ) {
    return this.canchaService.findAvailableCanchas(body);
  }
}
