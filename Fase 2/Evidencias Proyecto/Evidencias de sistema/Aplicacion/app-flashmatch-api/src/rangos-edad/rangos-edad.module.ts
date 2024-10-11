import { Module } from '@nestjs/common';
import { RangosEdadService } from './rangos-edad.service';
import { RangosEdadController } from './rangos-edad.controller';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RangoEdad } from './entities/rango-edad.entity';

@Module({
  controllers: [RangosEdadController],
  providers: [RangosEdadService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([RangoEdad]),
  ]
})
export class RangosEdadModule {}
