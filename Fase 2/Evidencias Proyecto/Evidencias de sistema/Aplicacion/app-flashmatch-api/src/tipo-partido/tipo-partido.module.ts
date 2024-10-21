import { Module } from '@nestjs/common';
import { TipoPartidoService } from './tipo-partido.service';
import { TipoPartidoController } from './tipo-partido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPartido } from './entities/tipo-partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [TipoPartidoController],
  providers: [TipoPartidoService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([TipoPartido])
  ]
})
export class TipoPartidoModule {}
