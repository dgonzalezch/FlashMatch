import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export class CreateReservaCanchaDto {
    @IsUUID()
    @IsNotEmpty()
    cancha_id: string;

    @IsUUID()
    @IsNotEmpty()
    partido_id: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_hora_reserva: string;

    @IsString()
    @IsOptional()
    comentario?: string;
}
