import { IsNotEmpty, IsString } from "class-validator";

export class CreatePreguntaFrecuenteDto {
    @IsString()
    @IsNotEmpty()
    pregunta: string;

    @IsString()
    @IsNotEmpty()
    respuesta: string;
}