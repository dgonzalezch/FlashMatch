import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialCanchaDto } from './create-material-cancha.dto';

export class UpdateMaterialCanchaDto extends PartialType(CreateMaterialCanchaDto) {}
