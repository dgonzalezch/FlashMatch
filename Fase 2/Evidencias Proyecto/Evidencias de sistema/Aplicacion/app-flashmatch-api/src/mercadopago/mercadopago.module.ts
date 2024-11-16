import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { MercadoPagoController } from './mercadopago.controller';
import { ConfigModule } from '@nestjs/config';
import { UsuarioPartidoService } from 'src/usuario-partido/usuario-partido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPartido } from 'src/usuario-partido/entities/usuario-partido.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Partido } from 'src/partido/entities/partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { PartidosGateway } from 'src/matchmaking/matchmaking.gateway';
import { ReservaCancha } from 'src/reserva/entities/reserva-cancha.entity';
import { Cancha } from 'src/cancha/entities/cancha.entity';
import { DisponibilidadCancha } from 'src/cancha/entities/disponibilidad-cancha.entity';
import { NotificacionService } from 'src/common/notificacion/notificacion.service';
import { Notificacion } from 'src/common/notificacion/entities/notificacion.entity';

@Module({
  providers: [MercadoPagoService, UsuarioPartidoService, ErrorHandlingService, PartidosGateway, NotificacionService],
  controllers: [MercadoPagoController],
  imports: [
    TypeOrmModule.forFeature([UsuarioPartido, Usuario, Partido, ReservaCancha, Cancha, DisponibilidadCancha, Notificacion]),
    ConfigModule
  ],
})
export class MercadoPagoModule { }
