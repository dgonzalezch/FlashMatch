import { Module } from '@nestjs/common';
import { TipoEmparejamiento } from './entities/tipo-emparejamiento.entity';
import { TipoEmparejamientoController } from './tipo-emparejamiento.controller';
import { TipoEmparejamientoService } from './tipo-emparejamiento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [TipoEmparejamientoController],
  providers: [TipoEmparejamientoService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([TipoEmparejamiento])
  ]
})
export class TipoEmparejamientoModule {}
