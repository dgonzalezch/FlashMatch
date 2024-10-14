import { Module } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partido } from './entities/partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [PartidosController],
  providers: [PartidosService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Partido])
  ]
})
export class PartidosModule {}
