import { Module } from '@nestjs/common';
import { DeportesPosicionesService } from './deportes-posiciones.service';
import { DeportesPosicionesController } from './deportes-posiciones.controller';

@Module({
  controllers: [DeportesPosicionesController],
  providers: [DeportesPosicionesService],
})
export class DeportesPosicionesModule {}
