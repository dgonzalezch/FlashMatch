import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ParametrosRendimientoService } from './parametros-rendimiento.service';
import { CreateParametroRendimientoDto } from './dto/create-parametro-rendimiento.dto';
import { UpdateParametroRendimientoDto } from './dto/update-parametro-rendimiento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('parametros-rendimiento')
export class ParametrosRendimientoController {
  constructor(private readonly parametrosRendimientoService: ParametrosRendimientoService) {}

  @Post()
  create(@Body() createParametrosRendimientoDto: CreateParametroRendimientoDto) {
    return this.parametrosRendimientoService.create(createParametrosRendimientoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.parametrosRendimientoService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.parametrosRendimientoService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateParametroRendimiento: UpdateParametroRendimientoDto) {
    return this.parametrosRendimientoService.update(id, updateParametroRendimiento);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.parametrosRendimientoService.remove(id);
  }
}
