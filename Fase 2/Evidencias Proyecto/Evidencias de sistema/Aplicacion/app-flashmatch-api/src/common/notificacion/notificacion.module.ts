import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionService } from './notificacion.service';
import { Notificacion } from './entities/notificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion])],
  providers: [NotificacionService],
  exports: [NotificacionService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class NotificacionModule {}
