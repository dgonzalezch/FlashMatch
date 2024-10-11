import { Module } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { AuthModule } from 'src/auth/auth.module';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { RangoEdad } from 'src/rangos-edad/entities/rango-edad.entity';

@Module({
  controllers: [EquiposController],
  providers: [EquiposService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Equipo, Usuario, Deporte, RangoEdad]),
    AuthModule
  ]
})
export class EquiposModule { }
