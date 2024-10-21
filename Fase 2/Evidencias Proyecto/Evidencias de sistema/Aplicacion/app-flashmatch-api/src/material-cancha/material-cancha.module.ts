import { Module } from '@nestjs/common';
import { MaterialCanchaService } from './material-cancha.service';
import { MaterialCanchaController } from './material-cancha.controller';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialCancha } from './entities/material-cancha.entity';

@Module({
  controllers: [MaterialCanchaController],
  providers: [MaterialCanchaService, ErrorHandlingService],
  imports: [
    TypeOrmModule.forFeature([MaterialCancha]),
  ]
})
export class MaterialCanchaModule {}
