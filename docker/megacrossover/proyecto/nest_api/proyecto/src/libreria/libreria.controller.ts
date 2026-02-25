import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LibreriaService } from './libreria.service';
import { CreateLibreriaDto } from './dto/create-libreria.dto';
import { UpdateLibreriaDto } from './dto/update-libreria.dto';
import { Libreria } from './entities/libreria.entity';

@Controller('libreria')
export class LibreriaController {
  constructor(private readonly libreriaService: LibreriaService) {}

  @Post()
  create(@Body() createLibreriaDto: CreateLibreriaDto): Promise<Libreria> {
    return this.libreriaService.create(createLibreriaDto);
  }

  @Get()
  findAll() {
    return this.libreriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libreriaService.findOne(+id);
  }
  @Get(':id/author')
  findbyIDAuthor(@Param('id') id: string){
    return this.libreriaService.findByAuthor(+id);
  }
  @Get('quantity/:id')
  findbyQuantity(@Param('id') id: string){
    return this.libreriaService.findByQuantity(+id);
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() createLibreriaDto: CreateLibreriaDto) {
    return this.libreriaService.update(+id, createLibreriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libreriaService.remove(+id);
  }
}
