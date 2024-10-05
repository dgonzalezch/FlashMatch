import { IsUUID } from 'class-validator';

export class CreateDeportePosicionUsuarioDto {
  @IsUUID()
  id_usuario: string;

  @IsUUID()
  id_deporte: string;

  @IsUUID()
  id_posicion: string;
}
