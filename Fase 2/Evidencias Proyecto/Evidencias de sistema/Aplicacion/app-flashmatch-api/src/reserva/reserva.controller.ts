import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaCanchaDto } from './dto/create-reserva-cancha.dto';
import { UpdateReservaCanchaDto } from './dto/update-reserva-cancha.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Post('cancha')
  createReservaCancha(
    @Body() createReservaCanchaDto: CreateReservaCanchaDto
  ) {
    return this.reservaService.createReservaCancha(createReservaCanchaDto);
  }

  @Get('cancha')
  findAllReservasCancha(
    @Query() paginationDto: PaginationDto
  ) {
    return this.reservaService.findAllReservasCancha(paginationDto);
  }

  @Get('cancha/:term')
  findOneReservaCancha(
    @Param('term') term: string
  ) {
    return this.reservaService.findOneReservaCancha(term);
  }

  @Patch('cancha/:id')
  updateReservaCancha(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservaCanchaDto: UpdateReservaCanchaDto
  ) {
    return this.reservaService.updateReservaCancha(id, updateReservaCanchaDto);
  }

  @Delete('cancha/:id')
  removeReservaCancha(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.reservaService.removeReservaCancha(id);
  }

  @Patch('cancha/:id/estado')
  updateEstadoReservaCancha(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('estado') estado: 'aceptada' | 'rechazada',
  ) {
    return this.reservaService.approveOrRejectReservaCancha(id, estado);
  }

}
