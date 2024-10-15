import { Module } from '@nestjs/common';
import { TiposPartidosService } from './tipos-partidos.service';
import { TiposPartidosController } from './tipos-partidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPartido } from './entities/tipo-partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [TiposPartidosController],
  providers: [TiposPartidosService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([TipoPartido])
  ]
})
export class TiposPartidosModule {}
