import { IsNotEmpty, IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CreateEstadisticaDetalladaUsuarioDto {
  @IsUUID()
  @IsNotEmpty()
  usuario_id: string;

  @IsUUID()
  @IsNotEmpty()
  deporte_id: string;

  @IsUUID()
  @IsNotEmpty()
  parametro_rendimiento_id: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  parametro_valor: number;
}
