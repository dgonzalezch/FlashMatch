import { PartialType } from '@nestjs/mapped-types';
import { CreateRangoEdadDto } from './create-rango-edad.dto';

export class UpdateRangoEdadDto extends PartialType(CreateRangoEdadDto) {}
