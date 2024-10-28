import { Module } from '@nestjs/common';
import { UsuarioPartidoService } from './usuario-partido.service';
import { UsuarioPartidoController } from './usuario-partido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPartido } from './entities/usuario-partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Partido } from 'src/partido/entities/partido.entity';

@Module({
  controllers: [UsuarioPartidoController],
  providers: [UsuarioPartidoService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([UsuarioPartido, Usuario, Partido])
  ]
})
export class UsuarioPartidoModule {}
