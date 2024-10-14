import { Module } from '@nestjs/common';
import { NivelesHabilidadService } from './niveles-habilidad.service';
import { NivelesHabilidadController } from './niveles-habilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelHabilidad } from './entities/nivel-habilidad.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [NivelesHabilidadController],
  providers: [NivelesHabilidadService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([NivelHabilidad])
  ]
})
export class NivelesHabilidadModule {}
