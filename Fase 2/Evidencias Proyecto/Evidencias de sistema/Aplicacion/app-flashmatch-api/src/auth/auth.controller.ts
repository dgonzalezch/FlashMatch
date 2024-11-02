import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register/:userType')
  createUsuario(
    @Param('userType') userType: string,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return this.authService.create(createUsuarioDto, userType);
  }

  @Post('login')
  loginUsuario(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.authService.login(loginUsuarioDto);
  }

  @Get('refresh-token')
  @Auth()
  refreshToken(@GetUser() usuario: Usuario) {
    return this.authService.refreshToken(usuario);
  }

  @Patch('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
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
