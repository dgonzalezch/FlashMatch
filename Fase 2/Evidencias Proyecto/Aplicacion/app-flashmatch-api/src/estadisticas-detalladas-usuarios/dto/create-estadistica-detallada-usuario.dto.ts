import { IsNotEmpty, IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CreateEstadisticaDetalladaUsuarioDto {

  @IsNotEmpty()
  @IsUUID()
  id_usuario: string;

  @IsNotEmpty()
  @IsUUID()
  id_deporte: string;

  @IsNotEmpty()
  @IsUUID()
  id_parametro_rendimiento: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  parametro_valor: number;
}