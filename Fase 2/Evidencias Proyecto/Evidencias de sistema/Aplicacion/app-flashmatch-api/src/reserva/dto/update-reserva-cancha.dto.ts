import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaCanchaDto } from './create-reserva-cancha.dto';

export class UpdateReservaCanchaDto extends PartialType(CreateReservaCanchaDto) {}
