import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluacionDto } from './create-evaluacion.dto';

export class UpdateEvaluacionDto extends PartialType(CreateEvaluacionDto) {}
