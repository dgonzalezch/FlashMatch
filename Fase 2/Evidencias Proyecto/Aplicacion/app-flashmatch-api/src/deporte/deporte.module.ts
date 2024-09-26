import { Module } from '@nestjs/common';
import { DeporteService } from './deporte.service';
import { DeporteController } from './deporte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deporte } from './entities/deporte.entity';

@Module({
  controllers: [DeporteController],
  providers: [DeporteService],
  imports: [
    TypeOrmModule.forFeature([Deporte])
  ]
})
export class DeporteModule {}
