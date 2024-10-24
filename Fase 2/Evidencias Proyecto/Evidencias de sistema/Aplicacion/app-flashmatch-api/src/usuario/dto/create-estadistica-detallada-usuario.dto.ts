import { IsNotEmpty, IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CreateEstadisticaDetalladaUsuarioDto {
  @IsUUID()
  usuario_id: string;

  @IsUUID()
  deporte_id: string;

  @IsUUID()
  parametro_rendimiento_id: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  parametro_valor: number;
}
