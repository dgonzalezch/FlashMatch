import { Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean, IsString, IsInt, Max, Min, IsNumber, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';

class HorarioDto {
    @IsString()
    @IsNotEmpty()
    hora: string;

    @IsBoolean()
    @IsNotEmpty()
    seleccionada: boolean;
}

export class CreateDisponibilidadCanchaDto {
    @IsNumber()
    @Min(1)
    @Max(7)
    @IsNotEmpty()
    dia: number;

    @IsString()
    @IsNotEmpty()
    prefijo: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsBoolean()
    @IsNotEmpty()
    seleccionado: boolean;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => HorarioDto)
    horarios: HorarioDto[];
}