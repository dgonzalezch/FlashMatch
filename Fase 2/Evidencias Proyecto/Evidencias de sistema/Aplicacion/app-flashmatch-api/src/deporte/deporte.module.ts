import { Module } from '@nestjs/common';
import { DeporteService } from './deporte.service';
import { DeporteController } from './deporte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deporte } from './entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { DeportePosicion } from '../deporte-posicion/entities/deporte-posicion.entity';

@Module({
  controllers: [DeporteController],
  providers: [
    DeporteService, 
    ErrorHandlingService
  ],
  imports: [
    TypeOrmModule.forFeature([Deporte, DeportePosicion])
  ]
})
export class DeporteModule {}
