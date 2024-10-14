import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoPartidoDto } from './create-tipo-partido.dto';

export class UpdateTipoPartidoDto extends PartialType(CreateTipoPartidoDto) {}
