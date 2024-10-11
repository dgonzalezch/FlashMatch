import { IsDecimal, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

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

    @IsDecimal({ decimal_digits: '10,8', force_decimal: true }, { message: 'Latitud debe ser un número decimal con 8 dígitos de precisión.' })
    @IsOptional()
    latitud?: number;

    @IsDecimal({ decimal_digits: '11,8', force_decimal: true }, { message: 'Longitud debe ser un número decimal con 8 dígitos de precisión.' })
    @IsOptional()
    longitud?: number;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsUUID()
    @IsNotEmpty()
    id_creador: string;

    @IsUUID()
    @IsNotEmpty()
    id_deporte: string;

    @IsUUID()
    @IsNotEmpty()
    id_rango: string;
}