import { Module } from '@nestjs/common';
import { UsuarioPartidoService } from './usuario-partido.service';
import { UsuarioPartidoController } from './usuario-partido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPartido } from './entities/usuario-partido.entity';

@Module({
  controllers: [UsuarioPartidoController],
  providers: [UsuarioPartidoService],
  imports: [
    TypeOrmModule.forFeature([UsuarioPartido])
  ]
})
export class UsuarioPartidoModule {}
