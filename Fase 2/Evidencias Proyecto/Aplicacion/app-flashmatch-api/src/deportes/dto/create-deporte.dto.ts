import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Equipo } from "src/equipos/entities/equipo.entity";

export class CreateDeporteDto {
    @IsString()
    @IsNotEmpty()
    nombre_deporte: string;

    @IsString()
    icono: string;
}
