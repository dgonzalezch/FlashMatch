import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTipoPartidoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre_tipo_partido: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
