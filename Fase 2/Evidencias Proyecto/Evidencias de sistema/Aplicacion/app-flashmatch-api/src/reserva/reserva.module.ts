import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaCancha } from './entities/reserva-cancha.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { Cancha } from 'src/cancha/entities/cancha.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { DisponibilidadCancha } from 'src/cancha/entities/disponibilidad-cancha.entity';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([ReservaCancha, Cancha, Usuario, DisponibilidadCancha])
  ]
})
export class ReservaModule {}
