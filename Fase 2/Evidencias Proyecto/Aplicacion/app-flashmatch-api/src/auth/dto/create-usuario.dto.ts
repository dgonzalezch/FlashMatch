import { IsEmail, IsMobilePhone, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(2)
    nombre: string;

    @IsString()
    @MinLength(2)
    apellido: string;

    @IsString()
    @MinLength(8)
    @MaxLength(9)
    rut: string;

    @IsString()
    @IsMobilePhone()
    telefono: string;

    @IsString()
    @IsEmail()
    correo: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, minúscula y un número.'
    })
    clave: string;
}