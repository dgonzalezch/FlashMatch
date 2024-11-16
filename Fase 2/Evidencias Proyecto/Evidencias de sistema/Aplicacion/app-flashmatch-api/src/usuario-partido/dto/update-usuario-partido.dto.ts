import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioPartidoDto } from './create-usuario-partido.dto';

export class UpdateUsuarioPartidoDto extends PartialType(CreateUsuarioPartidoDto) {}
