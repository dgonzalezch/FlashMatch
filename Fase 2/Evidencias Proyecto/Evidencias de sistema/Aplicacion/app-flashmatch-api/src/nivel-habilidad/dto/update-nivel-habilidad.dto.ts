import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelHabilidadDto } from './create-nivel-habilidad.dto';

export class UpdateNivelHabilidadDto extends PartialType(CreateNivelHabilidadDto) {}
