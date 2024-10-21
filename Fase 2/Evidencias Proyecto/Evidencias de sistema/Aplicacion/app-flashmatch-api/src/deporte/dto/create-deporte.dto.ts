import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MaxLength, ValidateIf } from "class-validator";

export class CreateDeporteDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100, { message: 'El nombre del deporte no puede exceder los 100 caracteres.' })
    nombre_deporte: string;

    @IsInt()
    @Min(1, { message: 'La cantidad mínima de jugadores debe ser al menos 1.' })
    cantidad_min_jugadores: number;
    
    @IsInt()
    @Max(50, { message: 'La cantidad máxima de jugadores no debe exceder 50.' })
    @ValidateIf((o) => o.cantidad_max_jugadores >= o.cantidad_min_jugadores)
    cantidad_max_jugadores: number;

    @IsString()
    @IsOptional()
    descripcion?: string;
    
    @IsString()
    @IsOptional()
    icono?: string;
}
