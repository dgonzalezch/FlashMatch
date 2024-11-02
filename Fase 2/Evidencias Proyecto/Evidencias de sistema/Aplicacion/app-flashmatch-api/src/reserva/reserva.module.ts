import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaCancha } from './entities/reserva-cancha.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Cancha } from 'src/cancha/entities/cancha.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { DisponibilidadCancha } from 'src/cancha/entities/disponibilidad-cancha.entity';
import { Partido } from 'src/partido/entities/partido.entity';
import { NotificacionModule } from 'src/common/notificacion/notificacion.module';
import { PagoModule } from 'src/common/pago/pago.module';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([ReservaCancha, Cancha, Usuario, DisponibilidadCancha, Partido]),
    NotificacionModule,
    PagoModule
  ]
})
export class ReservaModule {}
