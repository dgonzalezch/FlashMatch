import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadisticaDetalladaUsuarioDto } from './create-estadistica-detallada-usuario.dto';

export class UpdateEstadisticaDetalladaUsuarioDto extends PartialType(CreateEstadisticaDetalladaUsuarioDto) {}
