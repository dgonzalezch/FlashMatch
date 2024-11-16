import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionJugador } from './entities/evaluacion-jugador.entity';
import { NotificacionModule } from '../notificacion/notificacion.module';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Partido } from 'src/partido/entities/partido.entity';

@Module({
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
  imports: [
    TypeOrmModule.forFeature([EvaluacionJugador, Usuario, Partido]),
    NotificacionModule
  ],
})
export class EvaluacionModule {}
