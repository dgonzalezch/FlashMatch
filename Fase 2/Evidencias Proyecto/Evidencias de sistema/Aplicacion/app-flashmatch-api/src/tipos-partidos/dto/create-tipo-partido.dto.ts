import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTipoPartidoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nombre_tipo_partido: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
