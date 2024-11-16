import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum, IsNumber } from 'class-validator';

export class CreateReservaCanchaDto {
  @IsUUID()
  @IsNotEmpty()
  cancha_id: string;

  @IsUUID()
  @IsNotEmpty()
  partido_id: string;

  @IsString()
  @IsOptional()
  comentario?: string;

  @IsEnum(['pendiente', 'pagado', 'reembolsado'])
  @IsOptional()
  estado_pago?: 'pendiente' | 'pagado' | 'reembolsado';

  @IsNumber()
  @IsOptional()
  monto_pagado?: number;
}
