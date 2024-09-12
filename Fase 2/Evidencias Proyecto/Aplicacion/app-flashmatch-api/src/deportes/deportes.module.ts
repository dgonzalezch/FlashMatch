import { Module } from '@nestjs/common';
import { DeportesService } from './deportes.service';
import { DeportesController } from './deportes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deporte } from './entities/deporte.entity';

@Module({
  controllers: [DeportesController],
  providers: [DeportesService],
  imports: [
    TypeOrmModule.forFeature([Deporte])
  ]
})
export class DeportesModule {}
