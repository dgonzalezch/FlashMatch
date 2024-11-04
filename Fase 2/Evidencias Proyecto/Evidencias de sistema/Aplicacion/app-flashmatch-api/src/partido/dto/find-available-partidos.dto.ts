import { IsString, IsDateString, IsUUID, IsNotEmpty } from 'class-validator';

export class FindAvailablePartidosDto {
  @IsUUID()
  usuario_id: string;

  @IsUUID()
  deporte_id: string;

  // @IsDateString()
  // fecha: string;
}
