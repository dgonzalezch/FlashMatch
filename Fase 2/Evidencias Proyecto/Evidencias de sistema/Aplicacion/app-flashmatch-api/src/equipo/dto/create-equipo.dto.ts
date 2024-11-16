import { IsNumber, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";

export class CreateEquipoDto {
    @IsString()
    @IsNotEmpty()
    nombre_equipo: string;

    @IsString()
    @IsOptional()
    logo_equipo?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    ubicacion?: string;

    @IsNumber({ maxDecimalPlaces: 16 })
    @Min(-90)
    @Max(90)
    @IsOptional()
    latitud?: number;

    @IsNumber({ maxDecimalPlaces: 16 })
    @Min(-180)
    @Max(180)
    @IsOptional()
    longitud?: number;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsUUID()
    @IsNotEmpty()
    deporte_id: string;

    @IsUUID()
    @IsNotEmpty()
    rango_edad_id: string;

    @IsUUID()
    @IsNotEmpty()
    creador_id: string;
}
