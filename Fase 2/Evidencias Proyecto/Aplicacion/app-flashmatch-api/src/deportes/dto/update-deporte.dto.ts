import { PartialType } from '@nestjs/mapped-types';
import { CreateDeporteDto } from './create-deporte.dto';

export class UpdateDeporteDto extends PartialType(CreateDeporteDto) {}
