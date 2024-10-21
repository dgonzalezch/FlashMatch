import { Module } from '@nestjs/common';
import { DeportePosicionUsuarioService } from './deporte-posicion-usuario.service';
import { DeportePosicionUsuarioController } from './deporte-posicion-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeportePosicionUsuario } from './entities/deporte-posicion-usuario.entity';
import { DeportePosicion } from 'src/deporte-posicion/entities/deporte-posicion.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [DeportePosicionUsuarioController],
  providers: [DeportePosicionUsuarioService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([DeportePosicionUsuario, DeportePosicion, Usuario, Deporte])
  ]
})
export class DeportePosicionUsuarioModule {}
