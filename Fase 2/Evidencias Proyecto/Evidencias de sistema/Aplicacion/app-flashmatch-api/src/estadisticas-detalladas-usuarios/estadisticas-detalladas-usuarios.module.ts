import { Module } from '@nestjs/common';
import { EstadisticasDetalladasUsuariosService } from './estadisticas-detalladas-usuarios.service';
import { EstadisticasDetalladasUsuariosController } from './estadisticas-detalladas-usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticaDetalladaUsuario } from './entities/estadistica-detallada-usuario.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { ParametroRendimiento } from 'src/parametros-rendimiento/entities/parametro-rendimiento.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [EstadisticasDetalladasUsuariosController],
  providers: [EstadisticasDetalladasUsuariosService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([EstadisticaDetalladaUsuario, Deporte, Usuario, ParametroRendimiento]),
  ],
})
export class EstadisticasDetalladasUsuariosModule {}
