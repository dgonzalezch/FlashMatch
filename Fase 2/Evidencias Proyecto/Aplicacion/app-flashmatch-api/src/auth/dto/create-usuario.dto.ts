import { IsArray, IsBoolean, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength, IsDateString, IsDecimal } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(9)
    rut: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento: string;

    @IsString()
    @IsNotEmpty()
    @IsMobilePhone()
    telefono: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, minúscula y un número.'
    })
    clave: string;

    @IsArray()
    @IsOptional()
    roles?: string[] = ['usuario'];

    @IsString()
    @IsOptional()
    imagen_perfil?: string;

    @IsOptional()
    @IsDecimal({ decimal_digits: '10,8', force_decimal: true }, { message: 'Latitud debe ser un número decimal con 8 dígitos de precisión.' })
    latitud?: number;

    @IsOptional()
    @IsDecimal({ decimal_digits: '11,8', force_decimal: true }, { message: 'Longitud debe ser un número decimal con 8 dígitos de precisión.' })
    longitud?: number;
}
