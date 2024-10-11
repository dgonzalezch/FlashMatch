import { IsUUID, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateParametroRendimientoDto {
  @IsString()
  @MaxLength(100)
  nombre_parametro: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsUUID()
  id_deporte: string;
}
