import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNivelHabilidadDto {
  @IsString()
  @IsNotEmpty()
  nombre_nivel_habilidad: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
