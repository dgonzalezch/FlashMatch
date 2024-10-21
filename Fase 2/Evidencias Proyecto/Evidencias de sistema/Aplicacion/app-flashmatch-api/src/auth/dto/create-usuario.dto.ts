import { IsArray, IsBoolean, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength, IsDateString, IsDecimal, IsNumber, Min, Max } from "class-validator";

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
    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    @IsMobilePhone()
    telefono: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, minúscula y un número.'
    })
    clave: string;

    @IsString()
    @IsOptional()
    ubicacion?: string;
    
    @IsNumber({ maxDecimalPlaces: 16 })
    @Min(-90)
    @Max(90)
    @IsOptional()
    latitud?: number;
    
    @IsNumber({ maxDecimalPlaces: 16 })
    @Min(-180)
    @Max(180)
    @IsOptional()
    longitud?: number;
    

    @IsString()
    @IsOptional()
    imagen_perfil?: string;

    @IsArray()
    @IsOptional()
    roles?: string[] = ['usuario'];

    @IsBoolean()
    @IsOptional()
    activo?: boolean = true;
}
