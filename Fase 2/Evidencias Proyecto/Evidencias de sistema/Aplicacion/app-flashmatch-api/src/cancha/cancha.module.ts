import { Cancha } from './entities/cancha.entity';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { DisponibilidadCancha } from './entities/disponibilidad-cancha.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { MaterialCancha } from 'src/material-cancha/entities/material-cancha.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ImagenCancha } from './entities/imagen-cancha.entity';

@Module({
  controllers: [CanchaController],
  providers: [CanchaService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Cancha, DisponibilidadCancha, Deporte, Usuario, MaterialCancha, ImagenCancha]),
  ]
})
export class CanchaModule { }
