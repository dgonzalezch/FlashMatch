import { Module } from '@nestjs/common';
import { PartidoService } from './partido.service';
import { PartidoController } from './partido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partido } from './entities/partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { NivelHabilidad } from 'src/nivel-habilidad/entities/nivel-habilidad.entity';
import { TipoEmparejamiento } from 'src/tipo-emparejamiento/entities/tipo-emparejamiento.entity';
import { RangoEdad } from 'src/rango-edad/entities/rango-edad.entity';
import { TipoPartido } from 'src/tipo-partido/entities/tipo-partido.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ReservaCancha } from 'src/reserva/entities/reserva-cancha.entity';
import { UsuarioPartido } from 'src/usuario-partido/entities/usuario-partido.entity';
import { NotificacionModule } from 'src/common/notificacion/notificacion.module';

@Module({
  controllers: [PartidoController],
  providers: [PartidoService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Partido, Deporte, NivelHabilidad, TipoEmparejamiento, RangoEdad, TipoPartido, Usuario, ReservaCancha, UsuarioPartido]),
    NotificacionModule
  ]
})
export class PartidoModule {}
