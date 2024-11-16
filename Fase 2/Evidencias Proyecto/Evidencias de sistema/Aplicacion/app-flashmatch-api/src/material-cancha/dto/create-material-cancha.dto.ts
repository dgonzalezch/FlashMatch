import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateMaterialCanchaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre_material_cancha: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
