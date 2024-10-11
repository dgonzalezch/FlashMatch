import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
import { Equipo } from "src/equipos/entities/equipo.entity";

export class CreateDeporteDto {
    @IsString()
    @IsNotEmpty()
    nombre_deporte: string;

    @IsInt()
    @Min(1, { message: 'La cantidad mínima de jugadores debe ser al menos 1.' })
    cantidad_min_jugadores: number;
    
    @IsInt()
    @Max(50, { message: 'La cantidad máxima de jugadores no debe exceder 50.' })
    cantidad_max_jugadores: number;

    @IsString()
    @IsOptional()
    descripcion?: string;
    
    @IsString()
    @IsOptional()
    icono?: string;
}
