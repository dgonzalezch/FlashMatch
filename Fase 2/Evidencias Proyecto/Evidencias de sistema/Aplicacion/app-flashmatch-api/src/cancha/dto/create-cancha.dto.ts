import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, Max } from "class-validator";

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
  
    @IsBoolean()
    @IsOptional()
    disponible?: boolean = true;
  
    @IsUUID()
    @IsNotEmpty()
    deporte_id: string;

    @IsUUID()
    @IsNotEmpty()
    material_cancha_id: string;

    @IsUUID()
    @IsNotEmpty()
    administrador_cancha_id: string;
}
