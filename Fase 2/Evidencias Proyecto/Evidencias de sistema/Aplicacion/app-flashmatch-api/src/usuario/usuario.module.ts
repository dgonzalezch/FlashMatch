import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Usuario } from './entities/usuario.entity';
import { DeportePosicionUsuario } from './entities/deporte-posicion-usuario.entity';
import { EstadisticaDetalladaUsuario } from './entities/estadistica-detallada-usuario.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { DeportePosicion } from 'src/deporte-posicion/entities/deporte-posicion.entity';
import { ParametroRendimiento } from 'src/parametro-rendimiento/entities/parametro-rendimiento.entity';
import { RangoEdad } from 'src/rango-edad/entities/rango-edad.entity';
import { NivelHabilidad } from 'src/nivel-habilidad/entities/nivel-habilidad.entity';
import { TipoPartido } from 'src/tipo-partido/entities/tipo-partido.entity';
import { EvaluacionModule } from 'src/common/evaluacion/evaluacion.module';
import { Notificacion } from 'src/common/notificacion/entities/notificacion.entity';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Usuario, Deporte, DeportePosicion, DeportePosicionUsuario, EstadisticaDetalladaUsuario, ParametroRendimiento, RangoEdad, NivelHabilidad, TipoPartido, Notificacion]),
    EvaluacionModule
  ]
})
export class UsuarioModule {}
