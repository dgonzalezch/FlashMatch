import { Module } from '@nestjs/common';
import { DeportesService } from './deportes.service';
import { DeportesController } from './deportes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deporte } from './entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { DeportePosiciones } from '../deportes-posiciones/entities/deporte-posicion.entity';

@Module({
  controllers: [DeportesController],
  providers: [
    DeportesService, 
    ErrorHandlingService
  ],
  imports: [
    TypeOrmModule.forFeature([Deporte, DeportePosiciones])
  ]
})
export class DeportesModule {}
