import { IsUUID } from 'class-validator';

export class CreateDeportePosicionUsuarioDto {
  @IsUUID()
  usuario_id: string;

  @IsUUID()
  deporte_id: string;

  @IsUUID()
  deporte_posicion_id: string;
}
