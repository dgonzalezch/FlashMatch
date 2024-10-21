import { PartialType } from '@nestjs/mapped-types';
import { CreateDeportePosicionUsuarioDto } from './create-deporte-posicion-usuario.dto';

export class UpdateDeportePosicionUsuarioDto extends PartialType(CreateDeportePosicionUsuarioDto) {}
