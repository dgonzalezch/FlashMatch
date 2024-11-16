import { Module } from '@nestjs/common';
import { ParametroRendimientoService } from './parametro-rendimiento.service';
import { ParametroRendimientoController } from './parametro-rendimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametroRendimiento } from './entities/parametro-rendimiento.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [ParametroRendimientoController],
  providers: [ParametroRendimientoService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([ParametroRendimiento, Deporte]),
  ]
})
export class ParametroRendimientoModule {}
