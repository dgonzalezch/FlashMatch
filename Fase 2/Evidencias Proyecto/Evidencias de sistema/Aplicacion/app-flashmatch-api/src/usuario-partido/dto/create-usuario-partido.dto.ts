import { IsNotEmpty, IsUUID, IsString, IsIn, IsOptional } from 'class-validator';

export class CreateUsuarioPartidoDto {
  @IsUUID()
  @IsNotEmpty()
  usuario_id: string;

  @IsUUID()
  @IsNotEmpty()
  partido_id: string;

  @IsString()
  @IsIn(['A', 'B'])
  @IsOptional()
  equipo?: 'A' | 'B';

  @IsString()
  @IsIn(['pendiente', 'confirmado'])
  @IsNotEmpty()
  estado: 'pendiente' | 'confirmado';
}
