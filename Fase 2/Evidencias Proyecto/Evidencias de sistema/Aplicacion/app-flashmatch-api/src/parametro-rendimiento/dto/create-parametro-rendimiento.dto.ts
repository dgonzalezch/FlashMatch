import { IsUUID, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateParametroRendimientoDto {
  @IsString()
  @MaxLength(100)
  nombre_parametro_rendimiento: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsUUID()
  deporte_id: string;
}
