import { IsArray, IsBoolean, IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString, Matches, MaxLength, MinLength, IsDateString, IsDecimal, IsNumber, Min, Max, IsOptional } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
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
    @MaxLength(100)
    correo: string;

    @IsString()
    @IsNotEmpty()
    @IsMobilePhone()
    // @IsPhoneNumber('CL', { message: 'El número debe ser un teléfono móvil válido en Chile.' })
    telefono: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una letra mayúscula, minúscula y un número o símbolo.'
    })
    clave: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
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
    roles?: string[];

    @IsBoolean()
    @IsOptional()
    activo?: boolean = true;
}
