import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDeportePosicionUsuarioDto {
  @IsUUID()
  @IsNotEmpty()
  usuario_id: string;

  @IsUUID()
  @IsNotEmpty()
  deporte_id: string;

  @IsUUID()
  @IsNotEmpty()
  deporte_posicion_id: string;
}
