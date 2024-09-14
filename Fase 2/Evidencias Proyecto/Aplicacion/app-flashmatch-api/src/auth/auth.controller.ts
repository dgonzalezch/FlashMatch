import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto, LoginUsuarioDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { Usuario } from './entities/usuario.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.create(createUsuarioDto);
  }

  @Post('login')
  loginUsuario(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.authService.login(loginUsuarioDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() usuario: Usuario) {
    return this.authService.checkAuthStatus(usuario);
  }

  @Get('private3')
  @Auth(ValidRoles.usuario)
  privateRoute3(
    @GetUser() usuario: Usuario
  ) {

    return {
      ok: true,
      usuario
    }
  }
}
