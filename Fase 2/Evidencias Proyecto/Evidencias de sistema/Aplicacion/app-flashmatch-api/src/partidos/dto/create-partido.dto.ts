import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePartidoDto {
    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento: string;

    @IsNotEmpty()
    @IsUUID()
    id_deporte: string;

    @IsNotEmpty()
    @IsUUID()
    id_tipo_partido: string;

    @IsNotEmpty()
    @IsUUID()
    id_nivel_habilidad: string;

    @IsNotEmpty()
    @IsUUID()
    id_rango_edad: string;

    @IsNotEmpty()
    @IsUUID()
    id_tipo_emparejamiento: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsUUID()
    id_cancha?: string;

    @IsNotEmpty()
    @IsUUID()
    id_usuario_creador: string;

    @IsNotEmpty()
    @IsString()
    estado: string;
}
