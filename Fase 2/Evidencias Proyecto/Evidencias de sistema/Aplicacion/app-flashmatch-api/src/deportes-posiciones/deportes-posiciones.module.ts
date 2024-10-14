import { Module } from '@nestjs/common';
import { DeportesPosicionesService } from './deportes-posiciones.service';
import { DeportesPosicionesController } from './deportes-posiciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeportePosicion } from './entities/deporte-posicion.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [DeportesPosicionesController],
  providers: [DeportesPosicionesService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([DeportePosicion, Deporte])
  ]
})
export class DeportesPosicionesModule {}
