import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean } from 'class-validator';

export class CreatePartidoDto {
    @IsNotEmpty()
    @IsDateString()
    fecha_partido: string;

    @IsUUID()
    @IsNotEmpty()
    deporte_id: string;

    @IsUUID()
    @IsNotEmpty()
    tipo_partido_id: string;

    @IsUUID()
    @IsNotEmpty()
    nivel_habilidad_id: string;

    @IsUUID()
    @IsNotEmpty()
    rango_edad_id: string;

    @IsUUID()
    @IsNotEmpty()
    tipo_emparejamiento_id: string;

    @IsBoolean()
    @IsNotEmpty()
    partido_privado: boolean;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsUUID()
    @IsNotEmpty()
    creador_id: string;
}
