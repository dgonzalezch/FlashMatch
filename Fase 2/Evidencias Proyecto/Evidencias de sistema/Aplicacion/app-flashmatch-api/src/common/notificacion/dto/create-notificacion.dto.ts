import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNotificacionDto {
    @IsUUID()
    @IsNotEmpty()
    usuario_id: string;
  
    @IsString()
    @IsNotEmpty()
    mensaje: string;

    @IsBoolean()
    @IsOptional()
    leido?: boolean;
}
