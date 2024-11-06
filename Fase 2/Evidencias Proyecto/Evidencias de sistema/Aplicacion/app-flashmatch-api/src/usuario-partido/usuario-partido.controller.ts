import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsuarioPartidoService } from './usuario-partido.service';
import { CreateUsuarioPartidoDto } from './dto/create-usuario-partido.dto';
import { UpdateUsuarioPartidoDto } from './dto/update-usuario-partido.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('usuario-partido')
export class UsuarioPartidoController {
  constructor(private readonly usuarioPartidoService: UsuarioPartidoService) { }

  @Post()
  create(@Body() createUsuarioPartidoDto: CreateUsuarioPartidoDto) {
    return this.usuarioPartidoService.create(createUsuarioPartidoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usuarioPartidoService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usuarioPartidoService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUsuarioPartidoDto: UpdateUsuarioPartidoDto) {
    return this.usuarioPartidoService.update(id, updateUsuarioPartidoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioPartidoService.remove(id);
  }

  // Endpoint para unir un usuario a un partido
  @Post('join')
  joinUserToMatch(
    @Body() { userId, partidoId }: { userId: string; partidoId: string }
  ) {
    return this.usuarioPartidoService.joinUserToMatch(userId, partidoId);
  }

  // Endpoint para eliminar a un usuario de un partido (creador del partido)
  @Delete('remove/:userId/:partidoId')
  removeUserFromMatch(
    @Param('userId') userId: string,
    @Param('partidoId') partidoId: string
  ) {
    return this.usuarioPartidoService.removeUserFromMatch(userId, partidoId);
  }

  @Patch(':userId/:partidoId/leave')
  async leaveMatch(
    @Param('userId') userId: string,
    @Param('partidoId') partidoId: string,
  ) {
    return this.usuarioPartidoService.leaveMatch(userId, partidoId);
  }
}
