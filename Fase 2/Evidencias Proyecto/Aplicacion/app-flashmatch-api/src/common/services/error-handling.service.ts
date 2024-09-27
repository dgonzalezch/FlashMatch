import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ErrorHandlingService {
  handleDBErrors(error: any): never {
    // Error de duplicidad (constraint unique violation)
    if (error.code === '23505') {
      throw new BadRequestException('Ya existe un registro con este valor: ' + error.detail);
    }

    // Error de violación de restricción de llave foránea
    if (error.code === '23503') {
      throw new BadRequestException('Este registro está asociado a otros datos, no se puede eliminar.');
    }

    // Error de null violado
    if (error.code === '23502') {
      throw new BadRequestException('Faltan datos requeridos, por favor revisa la información.');
    }

    // Error de exceso de datos
    if (error.code === '22001') {
      throw new BadRequestException('El valor es demasiado largo para la columna: ' + error.detail);
    }

    // Error de sintaxis
    if (error.code === '42601') {
      throw new InternalServerErrorException('Error de sintaxis en la consulta SQL.');
    }

    // Error de tipo de datos
    if (error.code === '42804') {
      throw new BadRequestException('Tipo de dato incorrecto para el valor proporcionado.');
    }

    // En caso de errores no especificados, lanzar un error interno
    throw new InternalServerErrorException('Error inesperado, verifica los logs del servidor para más información.');
  }
}
