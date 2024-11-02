// src/pago/dto/procesar-pago.dto.ts
import { IsUUID, IsNotEmpty, IsNumber } from 'class-validator';

export class ProcesarPagoDto {
  @IsUUID()
  @IsNotEmpty()
  idReserva: string;

  @IsNumber()
  @IsNotEmpty()
  monto: number;  // Monto del pago
}
