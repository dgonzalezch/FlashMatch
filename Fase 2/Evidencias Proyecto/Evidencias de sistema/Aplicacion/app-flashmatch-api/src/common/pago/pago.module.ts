import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';

@Module({
  providers: [PagoService],
  exports: [PagoService],
})
export class PagoModule {}
