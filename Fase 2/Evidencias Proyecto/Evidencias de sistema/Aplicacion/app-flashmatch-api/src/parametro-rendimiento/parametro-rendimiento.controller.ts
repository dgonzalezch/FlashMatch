import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ParametroRendimientoService } from './parametro-rendimiento.service';
import { CreateParametroRendimientoDto } from './dto/create-parametro-rendimiento.dto';
import { UpdateParametroRendimientoDto } from './dto/update-parametro-rendimiento.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('parametro-rendimiento')
export class ParametroRendimientoController {
  constructor(private readonly parametroRendimientoService: ParametroRendimientoService) {}

  @Post()
  create(@Body() createParametrosRendimientoDto: CreateParametroRendimientoDto) {
    return this.parametroRendimientoService.create(createParametrosRendimientoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.parametroRendimientoService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.parametroRendimientoService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateParametroRendimiento: UpdateParametroRendimientoDto) {
    return this.parametroRendimientoService.update(id, updateParametroRendimiento);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.parametroRendimientoService.remove(id);
  }
}
