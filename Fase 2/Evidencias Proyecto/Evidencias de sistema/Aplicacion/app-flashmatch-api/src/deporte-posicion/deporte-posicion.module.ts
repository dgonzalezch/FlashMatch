import { Module } from '@nestjs/common';
import { DeportePosicionService } from './deporte-posicion.service';
import { DeportePosicionController } from './deporte-posicion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeportePosicion } from './entities/deporte-posicion.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [DeportePosicionController],
  providers: [DeportePosicionService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([DeportePosicion, Deporte])
  ]
})
export class DeportePosicionModule {}
