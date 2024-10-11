import { Module } from '@nestjs/common';
import { DeportesPosicionesUsuariosService } from './deportes-posiciones-usuarios.service';
import { DeportesPosicionesUsuariosController } from './deportes-posiciones-usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeportePosicionUsuario } from './entities/deporte-posicion-usuario.entity';
import { DeportePosicion } from 'src/deportes-posiciones/entities/deporte-posicion.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [DeportesPosicionesUsuariosController],
  providers: [DeportesPosicionesUsuariosService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([DeportePosicionUsuario, DeportePosicion, Usuario, Deporte])
  ]
})
export class DeportesPosicionesUsuariosModule {}
