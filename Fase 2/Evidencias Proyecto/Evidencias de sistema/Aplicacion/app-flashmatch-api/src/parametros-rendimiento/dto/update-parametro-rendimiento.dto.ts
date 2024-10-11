import { PartialType } from '@nestjs/mapped-types';
import { CreateParametroRendimientoDto } from './create-parametro-rendimiento.dto';

export class UpdateParametroRendimientoDto extends PartialType(CreateParametroRendimientoDto) {}
