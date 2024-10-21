import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { MaterialCanchaService } from './material-cancha.service';
import { CreateMaterialCanchaDto } from './dto/create-material-cancha.dto';
import { UpdateMaterialCanchaDto } from './dto/update-material-cancha.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('material-cancha')
export class MaterialCanchaController {
  constructor(private readonly materialCanchaService: MaterialCanchaService) { }

  @Post()
  create(@Body() createMaterialCanchaDto: CreateMaterialCanchaDto) {
    return this.materialCanchaService.create(createMaterialCanchaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.materialCanchaService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.materialCanchaService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMaterialCanchaDto: UpdateMaterialCanchaDto) {
    return this.materialCanchaService.update(id, updateMaterialCanchaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.materialCanchaService.remove(id);
  }
}