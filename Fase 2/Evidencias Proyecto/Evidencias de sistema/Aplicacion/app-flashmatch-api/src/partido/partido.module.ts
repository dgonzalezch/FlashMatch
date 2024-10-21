import { Module } from '@nestjs/common';
import { PartidoService } from './partido.service';
import { PartidoController } from './partido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partido } from './entities/partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [PartidoController],
  providers: [PartidoService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Partido])
  ]
})
export class PartidoModule {}
