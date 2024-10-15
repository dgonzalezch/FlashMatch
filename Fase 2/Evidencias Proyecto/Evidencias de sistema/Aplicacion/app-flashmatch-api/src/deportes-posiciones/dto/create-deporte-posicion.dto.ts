import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateDeportePosicionDto {
    @IsUUID()
    @IsNotEmpty()
    id_deporte: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    nombre_posicion: string;
}