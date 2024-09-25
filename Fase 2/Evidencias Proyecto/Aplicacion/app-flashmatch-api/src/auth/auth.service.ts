import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUsuarioDto, LoginUsuarioDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
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
        ...usuario,
        token: this.getJwtToken({ id: usuario.id })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const { clave, correo } = loginUsuarioDto;
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      select: { correo: true, clave: true, id: true }
    });

    if (!usuario)
      throw new UnauthorizedException('Error al iniciar sesión, (email) incorrecto.')

    if (!bcrypt.compareSync(clave, usuario.clave))
      throw new UnauthorizedException('Error al iniciar sesión, (contraseña) incorrecta.')

    return {
      ...usuario,
      token: this.getJwtToken({ id: usuario.id })
    };
  }

  async refreshToken(usuario: Usuario) {
    return {
      // ...usuario,
      token: this.getJwtToken({ id: usuario.id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Error, verifica los logs del servidor para mas info.');
  }
}
