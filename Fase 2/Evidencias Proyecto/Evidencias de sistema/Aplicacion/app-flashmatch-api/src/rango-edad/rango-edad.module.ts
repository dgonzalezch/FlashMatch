import { Module } from '@nestjs/common';
import { RangoEdadService } from './rango-edad.service';
import { RangoEdadController } from './rango-edad.controller';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RangoEdad } from './entities/rango-edad.entity';

@Module({
  controllers: [RangoEdadController],
  providers: [RangoEdadService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([RangoEdad]),
  ]
})
export class RangoEdadModule {}
