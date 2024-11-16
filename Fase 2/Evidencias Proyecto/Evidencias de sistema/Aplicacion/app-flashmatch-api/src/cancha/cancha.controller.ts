import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseInterceptors, UploadedFile, BadRequestException, NotFoundException } from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateDisponibilidadCanchaDto } from './dto/create-disponibilidad-cancha.dto';
import { UpdateDisponibilidadCanchaDto } from './dto/update-disponibilidad-cancha.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CanchasDisponiblesBodyDto } from './dto/canchas-disponibles-body.dto';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/files/helpers/file-namer.helper';
import * as fs from 'fs';
import * as path from 'path';

@Controller('cancha')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) { }

  @Post()
  create(
    @Body() createCanchaDto: CreateCanchaDto
  ) {
    return this.canchaService.create(createCanchaDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.canchaService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(
    @Param('term') term: string
  ) {
    return this.canchaService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCanchaDto: UpdateCanchaDto
  ) {
    return this.canchaService.update(id, updateCanchaDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.canchaService.remove(id);
  }

  @Post('disponibles')
  async findAvailableCanchas(
    @Body() body: CanchasDisponiblesBodyDto,
  ) {
    return this.canchaService.findAvailableCanchas(body);
  }

  @Post('upload-image/:id_cancha')
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
        destination: './uploads/cancha-images',
        filename: fileNamer,
      }),
    }),
  )
  async uploadCanchaImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id_cancha') canchaId: string,
  ) {
    if (!canchaId) {
      throw new BadRequestException('ID de cancha es requerido');
    }
    const filePath = `/uploads/cancha-images/${file.filename}`;
    await this.canchaService.addCanchaImage(canchaId, filePath);

    return { message: 'Imagen de cancha subida con éxito', filePath };
  }


  @Delete('delete-image/:id_imagen')
  async deleteCanchaImage(@Param('id_imagen', ParseUUIDPipe) idImagen: string) {
    if (!idImagen) {
      throw new BadRequestException('ID de imagen es requerido');
    }
    const imagen = await this.canchaService.findCanchaImageById(idImagen);
    if (!imagen) {
      throw new NotFoundException('Imagen no encontrada');
    }

    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'cancha-images', path.basename(imagen.url_imagen));

    // Eliminar la imagen del sistema de archivos
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error eliminando la imagen:', err);
      }
    });

    // Eliminar la imagen de la base de datos
    await this.canchaService.deleteImageById(idImagen);

    return { message: 'Imagen de cancha eliminada con éxito' };
  }
}
