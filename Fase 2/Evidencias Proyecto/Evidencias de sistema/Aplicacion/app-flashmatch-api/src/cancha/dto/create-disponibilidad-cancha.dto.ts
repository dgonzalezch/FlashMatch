import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class CreateDisponibilidadCanchaDto {
    @IsUUID()
    cancha_id: string;

    @IsInt()
    @Min(1)
    @Max(7)
    @IsNotEmpty()
    dia_semana: number;

    @IsNotEmpty()
    hora: string;

    @IsBoolean()
    @IsOptional()
    disponible?: boolean = true;
}
