// src/pago/dto/reembolso.dto.ts
import { IsUUID, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class ReembolsoDto {
  @IsUUID()
  @IsNotEmpty()
  idReserva: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  porcentaje: number;
}