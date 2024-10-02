import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateCanchaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre_cancha: string;
  
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    precio_por_hora: number;
  
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
  
    @IsBoolean()
    @IsOptional()
    disponible?: boolean = true;
  
    @IsUUID()
    @IsNotEmpty()
    id_deporte: string;

    @IsUUID()
    @IsNotEmpty()
    id_administrador_cancha: string;
}
