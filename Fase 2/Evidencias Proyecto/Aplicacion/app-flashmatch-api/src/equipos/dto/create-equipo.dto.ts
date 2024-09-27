import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export class CreateEquipoDto {
    @IsString()
    @IsNotEmpty()
    nombre_equipo: string;

    @IsString()
    logo_equipo?: string;

    @IsUUID()
    @IsNotEmpty()
    id_creador: string;

    @IsUUID()
    @IsNotEmpty()
    id_deporte: string;
}