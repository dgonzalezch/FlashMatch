import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PreguntaFrecuenteService } from './pregunta-frecuente.service';
import { CreatePreguntaFrecuenteDto } from './dto/create-pregunta-frecuente.dto';
import { UpdatePreguntaFrecuenteDto } from './dto/update-pregunta-frecuente.dto';

@Controller('preguntas-frecuentes')
export class PreguntaFrecuenteController {
  constructor(private readonly preguntaFrecuenteService: PreguntaFrecuenteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPreguntaFrecuenteDto: CreatePreguntaFrecuenteDto) {
    return this.preguntaFrecuenteService.create(createPreguntaFrecuenteDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.preguntaFrecuenteService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.preguntaFrecuenteService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updatePreguntaFrecuenteDto: UpdatePreguntaFrecuenteDto) {
    return this.preguntaFrecuenteService.update(id, updatePreguntaFrecuenteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.preguntaFrecuenteService.remove(id);
  }
}
