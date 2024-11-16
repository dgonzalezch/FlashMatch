import { PartialType } from '@nestjs/mapped-types';
import { CreatePreguntaFrecuenteDto } from './create-pregunta-frecuente.dto';

export class UpdatePreguntaFrecuenteDto extends PartialType(CreatePreguntaFrecuenteDto) {}
