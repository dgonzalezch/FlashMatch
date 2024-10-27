import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateTipoEmparejamientoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre_tipo_emparejamiento: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
