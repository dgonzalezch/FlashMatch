import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateDeportePosicionDto {
    @IsUUID()
    @IsNotEmpty()
    deporte_id: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    nombre_deporte_posicion: string;
}