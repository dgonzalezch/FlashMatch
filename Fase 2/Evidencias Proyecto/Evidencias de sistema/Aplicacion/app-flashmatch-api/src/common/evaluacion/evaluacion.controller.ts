import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';

@Controller('evaluacion')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  async agregarEvaluacion(@Body() data: { partidoId: string; evaluadorId: string; evaluadoId: string; puntuacion: number; comentario?: string }) {
    return this.evaluacionService.agregarEvaluacion(data.partidoId, data.evaluadorId, data.evaluadoId, data.puntuacion, data.comentario);
  }

  @Get(':evaluadoId')
  async obtenerEvaluacionesDeJugador(@Param('evaluadoId') evaluadoId: string) {
    return this.evaluacionService.obtenerEvaluacionesDeJugador(evaluadoId);
  }
}
