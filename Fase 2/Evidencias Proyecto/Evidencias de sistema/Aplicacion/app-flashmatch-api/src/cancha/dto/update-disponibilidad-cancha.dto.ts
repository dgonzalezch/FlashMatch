import { PartialType } from '@nestjs/mapped-types';
import { CreateDisponibilidadCanchaDto } from './create-disponibilidad-cancha.dto';

export class UpdateDisponibilidadCanchaDto extends PartialType(CreateDisponibilidadCanchaDto) { }
