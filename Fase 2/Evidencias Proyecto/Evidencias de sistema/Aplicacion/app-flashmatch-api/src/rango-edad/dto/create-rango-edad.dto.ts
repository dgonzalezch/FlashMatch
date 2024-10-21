import { IsInt, IsNotEmpty, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateRangoEdadDto {
    @IsInt()
    @Min(0, { message: 'La edad mínima debe ser al menos 0.' })
    @IsNotEmpty()
    edad_minima: number;

    @IsInt()
    @Max(120, { message: 'La edad máxima no puede ser mayor a 120.' })
    @IsNotEmpty()
    edad_maxima: number;

    @IsString()
    @IsOptional()
    descripcion?: string;
}
