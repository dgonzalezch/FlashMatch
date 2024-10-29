import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateDisponibilidadCanchaDto } from './dto/create-disponibilidad-cancha.dto';
import { UpdateDisponibilidadCanchaDto } from './dto/update-disponibilidad-cancha.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('disponibles')
  async findAvailableCanchas(
    @Query('latitud') latitud: number,
    @Query('longitud') longitud: number,
    @Query('fecha') fecha: string,
    @Query('hora') hora: string,
  ) {
    return this.canchaService.findAvailableCanchas({ latitud, longitud, fecha, hora });
  }

  // // Añadir disponibilidad
  // @Post(':id/disponibilidad')
  // addDisponibilidad(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() createDisponibilidadCanchaDto: CreateDisponibilidadCanchaDto
  // ) {
  //   return this.canchaService.addDisponibilidad({ ...createDisponibilidadCanchaDto, cancha_id: id });
  // }

  // // Obtener disponibilidad de una cancha
  // @Get(':id/disponibilidad')
  // getDisponibilidad(
  //   @Param('id', ParseUUIDPipe) id: string
  // ) {
  //   return this.canchaService.getDisponibilidad(id);
  // }

  // // Actualizar disponibilidad
  // @Patch('disponibilidad/:id_disponibilidad')
  // updateDisponibilidad(
  //   @Param('id_disponibilidad', ParseUUIDPipe) id_disponibilidad: string,
  //   @Body() updateDisponibilidadCanchaDto: UpdateDisponibilidadCanchaDto
  // ) {
  //   return this.canchaService.updateDisponibilidad(id_disponibilidad, updateDisponibilidadCanchaDto);
  // }

  // // Eliminar disponibilidad
  // @Delete('disponibilidad/:id_disponibilidad')
  // removeDisponibilidad(
  //   @Param('id_disponibilidad', ParseUUIDPipe) id_disponibilidad: string
  // ) {
  //   return this.canchaService.removeDisponibilidad(id_disponibilidad);
  // }
}
