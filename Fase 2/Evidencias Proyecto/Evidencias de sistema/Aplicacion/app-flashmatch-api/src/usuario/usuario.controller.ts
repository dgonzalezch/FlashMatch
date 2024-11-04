import { Controller, Get, Post, Body, Patch, Param, Query, ParseUUIDPipe, UseInterceptors, UploadedFile, Req, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateDeportePosicionUsuarioDto } from './dto/create-deporte-posicion-usuario.dto';  // Asegúrate de tener este DTO para el request
import { CreateEstadisticaDetalladaUsuarioDto } from './dto/create-estadistica-detallada-usuario.dto';  // Asegúrate de tener este DTO para el request
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileNamer } from 'src/files/helpers/file-namer.helper';
import { Auth } from 'src/auth/decorators';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.usuarioService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(
    @Param('term') term: string
  ) {
    return this.usuarioService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  // Endpoint para añadir una nueva relación deporte-posicion al usuario
  @Post('deporte-posicion')
  addDeportePosicionUsuario(
    @Body() createDeportePosicionUsuarioDto: CreateDeportePosicionUsuarioDto
  ) {
    const { usuario_id, deporte_id, deporte_posicion_id } = createDeportePosicionUsuarioDto;
    return this.usuarioService.addDeportePosicionUsuario(usuario_id, deporte_id, deporte_posicion_id);
  }

  // Endpoint para añadir una nueva estadística detallada al usuario
  @Post(':id/estadistica-detallada')
  addEstadisticaDetalladaUsuario(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createEstadisticaDetalladaUsuarioDto: CreateEstadisticaDetalladaUsuarioDto
  ) {
    const { deporte_id, parametro_rendimiento_id, parametro_valor } = createEstadisticaDetalladaUsuarioDto;
    return this.usuarioService.addEstadisticaDetalladaUsuario(id, deporte_id, parametro_rendimiento_id, parametro_valor);
  }

  @Post('upload-profile-picture/:id_usuario')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 2 }, // Límite de 2 MB
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: fileNamer
      }),
    })
  )
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Param('id_usuario') userId: string // Recibe el ID del usuario como parámetro
  ) {
    if (!userId) {
      throw new BadRequestException('ID de usuario es requerido');
    }
  
    const filePath = `/uploads/profile-pictures/${file.filename}`;
    await this.usuarioService.updateProfilePicture(userId, filePath);
    return { message: 'Imagen de perfil actualizada con éxito', filePath };
  }
}
