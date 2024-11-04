import { Module } from '@nestjs/common';
import { UsuarioPartidoService } from './usuario-partido.service';
import { UsuarioPartidoController } from './usuario-partido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPartido } from './entities/usuario-partido.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Partido } from 'src/partido/entities/partido.entity';
import { PartidosGateway } from 'src/matchmaking/matchmaking.gateway';

@Module({
  controllers: [UsuarioPartidoController],
  providers: [UsuarioPartidoService, ErrorHandlingService, PartidosGateway],
  imports: [
    TypeOrmModule.forFeature([UsuarioPartido, Usuario, Partido])
  ]
})
export class UsuarioPartidoModule {}
