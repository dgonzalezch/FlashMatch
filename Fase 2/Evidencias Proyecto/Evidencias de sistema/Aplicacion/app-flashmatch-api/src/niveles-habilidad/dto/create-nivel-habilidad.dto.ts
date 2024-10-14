import { IsOptional, IsString } from 'class-validator';

export class CreateNivelHabilidadDto {
  @IsOptional()
  @IsString()
  descripcion?: string;
}