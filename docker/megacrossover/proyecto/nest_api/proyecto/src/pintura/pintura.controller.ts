import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PinturaService } from './pintura.service';
import { CreatePinturaDto } from './dto/create-pintura.dto';
import { UpdatePinturaDto } from './dto/update-pintura.dto';

@Controller('pintura')
export class PinturaController {
  constructor(private readonly pinturaService: PinturaService) {}

  @Post()
  create(@Body() createPinturaDto: CreatePinturaDto) {
    return this.pinturaService.create(createPinturaDto);
  }

  @Get()
  findAll() {
    return this.pinturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pinturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePinturaDto: UpdatePinturaDto) {
    return this.pinturaService.update(+id, updatePinturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pinturaService.remove(+id);
  }
}
