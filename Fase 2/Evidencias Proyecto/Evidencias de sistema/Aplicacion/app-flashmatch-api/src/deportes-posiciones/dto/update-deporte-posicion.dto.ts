import { PartialType } from '@nestjs/mapped-types';
import { CreateDeportePosicionDto } from './create-deporte-posicion.dto';

export class UpdateDeportePosicionDto extends PartialType(CreateDeportePosicionDto) {}
