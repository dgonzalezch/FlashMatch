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
import { PartidosGateway } from 'src/matchmaking/matchmaking.gateway';
import { MercadoPagoService } from 'src/mercadopago/mercadopago.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService, ErrorHandlingService, PartidosGateway, MercadoPagoService],
  imports: [
    TypeOrmModule.forFeature([ReservaCancha, Cancha, Usuario, DisponibilidadCancha, Partido]),
    NotificacionModule,
    ConfigModule
  ]
})
export class ReservaModule {}
