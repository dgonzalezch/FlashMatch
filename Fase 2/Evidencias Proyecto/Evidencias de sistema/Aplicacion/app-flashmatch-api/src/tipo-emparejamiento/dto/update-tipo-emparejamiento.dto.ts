import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEmparejamientoDto } from './create-tipo-emparejamiento.dto';

export class UpdateTipoEmparejamientoDto extends PartialType(CreateTipoEmparejamientoDto) {}
