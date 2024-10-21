import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Usuario])
  ]
})
export class UsuarioModule {}
