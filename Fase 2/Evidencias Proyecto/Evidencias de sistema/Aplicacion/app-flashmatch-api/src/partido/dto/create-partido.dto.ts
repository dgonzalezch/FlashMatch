import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePartidoDto {
    @IsDateString()
    @IsNotEmpty()
    fecha_partido: string;

    @IsNotEmpty()
    @IsUUID()
    deporte_id: string;

    @IsNotEmpty()
    @IsUUID()
    tipo_partido_id: string;

    @IsNotEmpty()
    @IsUUID()
    nivel_habilidad_id: string;

    @IsNotEmpty()
    @IsUUID()
    rango_edad_id: string;

    @IsNotEmpty()
    @IsUUID()
    tipo_emparejamiento_id: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsUUID()
    cancha_id?: string;

    @IsNotEmpty()
    @IsUUID()
    usuario_creador_id: string;

    @IsNotEmpty()
    @IsString()
    estado: string;
}
