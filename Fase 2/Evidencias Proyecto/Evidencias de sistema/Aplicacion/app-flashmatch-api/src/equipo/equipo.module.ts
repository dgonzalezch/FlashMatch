import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { AuthModule } from 'src/auth/auth.module';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { RangoEdad } from 'src/rango-edad/entities/rango-edad.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Equipo, Usuario, Deporte, RangoEdad])
  ]
})
export class EquipoModule { }
