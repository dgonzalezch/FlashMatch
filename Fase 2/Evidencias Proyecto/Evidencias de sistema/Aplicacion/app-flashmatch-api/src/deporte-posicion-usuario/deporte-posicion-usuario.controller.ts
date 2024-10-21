import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { DeportePosicionUsuarioService } from './deporte-posicion-usuario.service';
import { CreateDeportePosicionUsuarioDto } from './dto/create-deporte-posicion-usuario.dto';
import { UpdateDeportePosicionUsuarioDto } from './dto/update-deporte-posicion-usuario.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('deporte-posicion-usuario')
export class DeportePosicionUsuarioController {
  constructor(private readonly deportePosicionUsuarioService: DeportePosicionUsuarioService) {}

  @Post()
  create(@Body() createDeportePosicionUsuarioDto: CreateDeportePosicionUsuarioDto) {
    return this.deportePosicionUsuarioService.create(createDeportePosicionUsuarioDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.deportePosicionUsuarioService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.deportePosicionUsuarioService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeportePosicionUsuarioDto: UpdateDeportePosicionUsuarioDto) {
    return this.deportePosicionUsuarioService.update(id, updateDeportePosicionUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deportePosicionUsuarioService.remove(id);
  }
}
