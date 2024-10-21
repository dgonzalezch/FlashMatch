import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateTipoEmparejamientoDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    nombre_tipo_emparejamiento: string;

    @IsOptional()
    @IsString()
    descripcion?: string;
}
