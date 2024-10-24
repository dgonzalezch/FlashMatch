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

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Usuario, Deporte, DeportePosicion, DeportePosicionUsuario, EstadisticaDetalladaUsuario, ParametroRendimiento])
  ]
})
export class UsuarioModule {}
