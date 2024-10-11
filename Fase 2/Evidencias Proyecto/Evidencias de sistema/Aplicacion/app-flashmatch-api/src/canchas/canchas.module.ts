import { Module } from '@nestjs/common';
import { CanchasService } from './canchas.service';
import { CanchasController } from './canchas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancha } from './entities/cancha.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [CanchasController],
  providers: [CanchasService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([Cancha, Deporte, Usuario])
  ]
})
export class CanchasModule { }
