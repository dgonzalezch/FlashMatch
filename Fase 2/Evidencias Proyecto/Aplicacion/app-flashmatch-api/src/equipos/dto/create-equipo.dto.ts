import { IsDecimal, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateEquipoDto {
    @IsString()
    @IsNotEmpty()
    nombre_equipo: string;

    @IsString()
    logo_equipo?: string;

    @IsString()
    descripcion_equipo?: string;

    @IsOptional()
    @IsDecimal({ decimal_digits: '10,8', force_decimal: true }, { message: 'Latitud debe ser un número decimal con 8 dígitos de precisión.' })
    latitud?: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '11,8', force_decimal: true }, { message: 'Longitud debe ser un número decimal con 8 dígitos de precisión.' })
    longitud?: number;

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