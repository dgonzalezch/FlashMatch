import { Module } from '@nestjs/common';
import { UsuarioPartidoService } from './usuario-partido.service';
import { UsuarioPartidoController } from './usuario-partido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPartido } from './entities/usuario-partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Partido } from 'src/partido/entities/partido.entity';
import { PartidosGateway } from 'src/matchmaking/matchmaking.gateway';
import { MercadoPagoService } from 'src/mercadopago/mercadopago.service';
import { ConfigModule } from '@nestjs/config';
import { ReservaCancha } from 'src/reserva/entities/reserva-cancha.entity';
import { Cancha } from 'src/cancha/entities/cancha.entity';
import { DisponibilidadCancha } from 'src/cancha/entities/disponibilidad-cancha.entity';
import { NotificacionModule } from 'src/common/notificacion/notificacion.module';

@Module({
  controllers: [UsuarioPartidoController],
  providers: [UsuarioPartidoService, ErrorHandlingService, PartidosGateway, MercadoPagoService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsuarioPartido, Usuario, Partido, ReservaCancha, Cancha, DisponibilidadCancha]),
    NotificacionModule,
  ]
})
export class UsuarioPartidoModule {}
