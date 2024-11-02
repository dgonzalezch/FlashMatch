import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaCanchaDto } from './dto/create-reserva-cancha.dto';
import { UpdateReservaCanchaDto } from './dto/update-reserva-cancha.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseMessage } from 'src/common/interfaces/response.interface';
import { ReservaCancha } from './entities/reserva-cancha.entity';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post('cancha')
  createReservaCancha(
    @Body() createReservaCanchaDto: CreateReservaCanchaDto
  ): Promise<ResponseMessage<ReservaCancha>> {
    return this.reservaService.createReservaCancha(createReservaCanchaDto);
  }

  @Get('cancha')
  findAllReservasCancha(
    @Query() paginationDto: PaginationDto
  ): Promise<ResponseMessage<ReservaCancha[]>> {
    return this.reservaService.findAllReservasCancha(paginationDto);
  }

  @Get('cancha/:term')
  findOneReservaCancha(
    @Param('term') term: string
  ): Promise<ResponseMessage<ReservaCancha>> {
    return this.reservaService.findOneReservaCancha(term);
  }

  @Patch('cancha/:id')
  updateReservaCancha(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservaCanchaDto: UpdateReservaCanchaDto
  ): Promise<ResponseMessage<ReservaCancha>> {
    return this.reservaService.updateReservaCancha(id, updateReservaCanchaDto);
  }

  @Delete('cancha/:id')
  removeReservaCancha(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ResponseMessage<ReservaCancha>> {
    return this.reservaService.removeReservaCancha(id);
  }

  @Patch('cancha/:id/estado')
  updateEstadoReservaCancha(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('estado') estado: 'aceptada' | 'rechazada',
  ): Promise<ResponseMessage<ReservaCancha>> {
    return this.reservaService.approveOrRejectReservaCancha(id, estado);
  }

  @Patch('cancha/:id/cancelar')
  cancelReservaCancha(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ResponseMessage<ReservaCancha>> {
    return this.reservaService.cancelarReservaCancha(id);
  }

  @Get('cancha/disponibilidad/:cancha_id')
  checkAvailability(
    @Param('cancha_id', ParseUUIDPipe) cancha_id: string,
    @Query('fecha_hora_reserva') fecha_hora_reserva: string
  ): Promise<boolean> {
    const fechaHoraReservaDate = new Date(fecha_hora_reserva);
    return this.reservaService.checkAvailability(cancha_id, fechaHoraReservaDate);
  }

  // Nuevo método para confirmar reserva mediante pago parcial
  @Patch('cancha/:id/confirmar')
  confirmarReserva(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('monto') monto: number
  ): Promise<ResponseMessage<ReservaCancha>> {
    return this.reservaService.confirmarReserva(id, monto);
  }

  // Nuevo método para enviar recordatorio de pago completo
  @Patch('cancha/:id/recordatorio-pago')
  recordatorioPagoCompleto(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<void> {
    return this.reservaService.recordatorioPagoCompleto(id);
  }
}
