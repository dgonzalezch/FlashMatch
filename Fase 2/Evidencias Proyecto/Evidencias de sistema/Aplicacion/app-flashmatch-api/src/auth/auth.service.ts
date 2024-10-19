import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUsuarioDto, LoginUsuarioDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ErrorHandlingService } from 'src/common/services/error-handling.service';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly errorHandlingService: ErrorHandlingService,
    private readonly jwtService: JwtService
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {

      const { clave, ...usuarioData } = createUsuarioDto;

      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        clave: bcrypt.hashSync(clave, 10)
      });

      await this.usuarioRepository.save(usuario);
      delete usuario.clave;

      return {
        message: 'Usuario creado con éxito.',
        data: usuario,
        token: this.getJwtToken({ id_usuario: usuario.id_usuario })
      };

    } catch (error) {
      this.errorHandlingService.handleDBErrors(error);
    }
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const { clave, correo } = loginUsuarioDto;
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      select: { id_usuario: true, correo: true, clave: true, nombre: true, apellido: true, roles: true, ubicacion: true, latitud: true, longitud: true }
    });

    if (!usuario)
      throw new UnauthorizedException('Error al iniciar sesión, (email) incorrecto.')

    if (!bcrypt.compareSync(clave, usuario.clave))
      throw new UnauthorizedException('Error al iniciar sesión, (contraseña) incorrecta.')

    return {
      ...usuario,
      token: this.getJwtToken({ id_usuario: usuario.id_usuario })
    };
  }

  async refreshToken(usuario: Usuario) {
    return {
      // ...usuario,
      token: this.getJwtToken({ id_usuario: usuario.id_usuario })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
