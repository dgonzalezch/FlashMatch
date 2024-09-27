import { Module } from '@nestjs/common';
import { CanchasService } from './canchas.service';
import { CanchasController } from './canchas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancha } from './entities/cancha.entity';

@Module({
  controllers: [CanchasController],
  providers: [CanchasService],
  imports: [
    TypeOrmModule.forFeature([Cancha])
  ]
})
export class CanchasModule {}
