import { IsDateString, IsNotEmpty, IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreatePartidoDto {
    @IsDateString()
    @IsNotEmpty()
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

    // @IsUUID()
    // @IsNotEmpty()
    // tipo_emparejamiento_id: string;

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
