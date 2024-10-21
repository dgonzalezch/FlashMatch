import { Cancha } from './entities/cancha.entity';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { MaterialCancha } from 'src/material-cancha/entities/material-cancha.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/auth/entities/usuario.entity';

@Module({
  controllers: [CanchaController],
  providers: [CanchaService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Cancha, Deporte, Usuario, MaterialCancha])
  ]
})
export class CanchaModule { }
