import { Module } from '@nestjs/common';
import { TipoEmparejamiento } from './entities/tipo-emparejamiento.entity';
import { TiposEmparejamientosController } from './tipos-emparejamientos.controller';
import { TiposEmparejamientosService } from './tipos-emparejamientos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [TiposEmparejamientosController],
  providers: [TiposEmparejamientosService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([TipoEmparejamiento])
  ]
})
export class TiposEmparejamientosModule {}
