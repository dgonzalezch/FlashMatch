import { Module } from '@nestjs/common';
import { EstadisticaDetalladaUsuarioService } from './estadistica-detallada-usuario.service';
import { EstadisticaDetalladaUsuarioController } from './estadistica-detallada-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticaDetalladaUsuario } from './entities/estadistica-detallada-usuario.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { ParametroRendimiento } from 'src/parametro-rendimiento/entities/parametro-rendimiento.entity';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';

@Module({
  controllers: [EstadisticaDetalladaUsuarioController],
  providers: [EstadisticaDetalladaUsuarioService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([EstadisticaDetalladaUsuario, Deporte, Usuario, ParametroRendimiento]),
  ],
})
export class EstadisticaDetalladaUsuarioModule {}
