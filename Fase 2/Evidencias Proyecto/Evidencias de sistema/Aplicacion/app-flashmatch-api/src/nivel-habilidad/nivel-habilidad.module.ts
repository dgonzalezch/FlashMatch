import { Module } from '@nestjs/common';
import { NivelHabilidadService } from './nivel-habilidad.service';
import { NivelHabilidadController } from './nivel-habilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelHabilidad } from './entities/nivel-habilidad.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [NivelHabilidadController],
  providers: [NivelHabilidadService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([NivelHabilidad])
  ]
})
export class NivelHabilidadModule {}
