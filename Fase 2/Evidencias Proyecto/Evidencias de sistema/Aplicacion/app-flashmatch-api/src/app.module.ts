import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EquipoModule } from './equipo/equipo.module';
import { CanchaModule } from './cancha/cancha.module';
import { PartidoModule } from './partido/partido.module';
import { RangoEdadModule } from './rango-edad/rango-edad.module';
import { DeporteModule } from './deporte/deporte.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DeportePosicionModule } from './deporte-posicion/deporte-posicion.module';
import { ParametroRendimientoModule } from './parametro-rendimiento/parametro-rendimiento.module';
import { TipoPartidoModule } from './tipo-partido/tipo-partido.module';
import { NivelHabilidadModule } from './nivel-habilidad/nivel-habilidad.module';
import { TipoEmparejamientoModule } from './tipo-emparejamiento/tipo-emparejamiento.module';
import { MaterialCanchaModule } from './material-cancha/material-cancha.module';
import { ReservaModule } from './reserva/reserva.module';
import { UsuarioPartidoModule } from './usuario-partido/usuario-partido.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificacionModule } from './common/notificacion/notificacion.module';
// import { MatchmakingModule } from './matchmaking/matchmaking.module';
import { MercadoPagoService } from './mercadopago/mercadopago.service';
import { MercadoPagoController } from './mercadopago/mercadopago.controller';
import { MercadoPagoModule } from './mercadopago/mercadopago.module';
import { PreguntaFrecuenteModule } from './pregunta-frecuente/pregunta-frecuente.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    EquipoModule,
    CanchaModule,
    PartidoModule,
    RangoEdadModule,
    DeporteModule,
    UsuarioModule,
    DeportePosicionModule,
    ParametroRendimientoModule,
    TipoPartidoModule,
    NivelHabilidadModule,
    TipoEmparejamientoModule,
    MaterialCanchaModule,
    ReservaModule,
    UsuarioPartidoModule,
    NotificacionModule,
    MercadoPagoModule,
    PreguntaFrecuenteModule,
  ],
  providers: [],
})
export class AppModule { }
