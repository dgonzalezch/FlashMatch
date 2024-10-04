import { Module } from '@nestjs/common';
import { DeportesPosicionesUsuariosService } from './deportes-posiciones-usuarios.service';
import { DeportesPosicionesUsuariosController } from './deportes-posiciones-usuarios.controller';

@Module({
  controllers: [DeportesPosicionesUsuariosController],
  providers: [DeportesPosicionesUsuariosService],
})
export class DeportesPosicionesUsuariosModule {}
