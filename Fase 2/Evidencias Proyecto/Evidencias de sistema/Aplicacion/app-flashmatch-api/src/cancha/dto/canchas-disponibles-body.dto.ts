import { IsNumber, IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CanchasDisponiblesBodyDto {
  @IsNumber()
  @IsNotEmpty()
  latitud: number;

  @IsNumber()
  @IsNotEmpty()
  longitud: number;

  @IsUUID()
  @IsNotEmpty()
  partido_id: string;
}
