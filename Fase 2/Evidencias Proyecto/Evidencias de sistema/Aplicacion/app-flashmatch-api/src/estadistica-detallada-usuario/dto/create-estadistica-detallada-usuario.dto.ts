import { IsNotEmpty, IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CreateEstadisticaDetalladaUsuarioDto {
  @IsNotEmpty()
  @IsUUID()
  usuario_id: string;

  @IsNotEmpty()
  @IsUUID()
  deporte_id: string;

  @IsNotEmpty()
  @IsUUID()
  parametro_rendimiento_id: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  parametro_valor: number;
}
