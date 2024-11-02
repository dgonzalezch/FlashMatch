import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PartidoService } from './partido.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('partido')
export class PartidoController {
  constructor(private readonly partidoService: PartidoService) {}

  @Post()
  create(@Body() createPartidoDto: CreatePartidoDto) {
    return this.partidoService.create(createPartidoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.partidoService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.partidoService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePartidoDto: UpdatePartidoDto
  ) {
    return this.partidoService.update(id, updatePartidoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.partidoService.remove(id);
  }

  // Confirmar asistencia de un jugador a un partido
  @Patch(':id/confirmar-asistencia/:usuarioId')
  confirmarAsistencia(
    @Param('id', ParseUUIDPipe) partidoId: string,
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string
  ) {
    return this.partidoService.confirmarAsistencia(usuarioId, partidoId);
  }

  // Confirmación final de asistencia antes del partido
  @Patch(':id/confirmacion-final')
  confirmacionFinal(@Param('id', ParseUUIDPipe) partidoId: string) {
    return this.partidoService.confirmacionFinal(partidoId);
  }

  // Método para rellenar jugadores automáticamente si faltan jugadores
  @Patch(':id/rellenar-jugadores')
  rellenarJugadores(@Param('id', ParseUUIDPipe) partidoId: string) {
    return this.partidoService.rellenarJugadores(partidoId);
  }

  // Invitar a un jugador a un partido
  @Post(':id/invitar-jugador/:usuarioId')
  invitarJugador(
    @Param('id', ParseUUIDPipe) partidoId: string,
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string
  ) {
    return this.partidoService.invitarJugador(partidoId, usuarioId);
  }

  // Aceptar una invitación para un partido
  @Patch(':id/aceptar-invitacion/:usuarioId')
  aceptarInvitacion(
    @Param('id', ParseUUIDPipe) partidoId: string,
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string
  ) {
    return this.partidoService.aceptarInvitacion(partidoId, usuarioId);
  }

  // Agregar un reemplazo para un jugador en un partido
  @Patch(':id/agregar-reemplazo/:usuarioReemplazanteId/:usuarioReemplazadoId')
  agregarReemplazo(
    @Param('id', ParseUUIDPipe) partidoId: string,
    @Param('usuarioReemplazanteId', ParseUUIDPipe) usuarioReemplazanteId: string,
    @Param('usuarioReemplazadoId', ParseUUIDPipe) usuarioReemplazadoId: string
  ) {
    return this.partidoService.agregarReemplazo(partidoId, usuarioReemplazanteId, usuarioReemplazadoId);
  }
}
