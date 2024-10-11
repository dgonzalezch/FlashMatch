import { Module } from '@nestjs/common';
import { ParametrosRendimientoService } from './parametros-rendimiento.service';
import { ParametrosRendimientoController } from './parametros-rendimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametroRendimiento } from './entities/parametro-rendimiento.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [ParametrosRendimientoController],
  providers: [ParametrosRendimientoService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([ParametroRendimiento, Deporte]),
  ]
})
export class ParametrosRendimientoModule {}
