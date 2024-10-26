import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export class CreateReservaCanchaDto {
    @IsUUID()
    @IsNotEmpty()
    cancha_id: string;

    @IsUUID()
    @IsNotEmpty()
    usuario_id: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_reserva: string;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)  // Formato HH:MM de 24 horas
    hora_reserva: string;

    @IsString()
    @IsOptional()
    mensaje?: string;
}
