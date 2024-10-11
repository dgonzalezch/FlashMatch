import { Module } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partido } from './entities/partido.entity';

@Module({
  controllers: [PartidosController],
  providers: [PartidosService],
  imports: [
    TypeOrmModule.forFeature([Partido])
  ]
})
export class PartidosModule {}
