import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Usuario])
  ]
})
export class UsuariosModule {}
