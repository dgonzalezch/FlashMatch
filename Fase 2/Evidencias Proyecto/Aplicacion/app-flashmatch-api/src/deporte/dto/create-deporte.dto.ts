import { IsString, MinLength } from "class-validator";

export class CreateDeporteDto {
    @IsString()
    @MinLength(1)
    nombre_deporte: string;

    @IsString()
    @MinLength(1)
    icono: string;
}
