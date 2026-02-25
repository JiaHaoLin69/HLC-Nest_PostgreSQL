import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { Pelicula } from './entities/pelicula.entity';

@Controller('peliculas')
export class PeliculasController {
    constructor(private readonly peliculasService: PeliculasService) { }

    @Post()
    create(@Body() createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
        return this.peliculasService.create(createPeliculaDto);
    }

    @Get()
    findAll(): Promise<Pelicula[]> {
        return this.peliculasService.findAll();
    }

    @Get('titulo/:titulo')
    findByTitulo(@Param('titulo') titulo: string): Promise<Pelicula[]> {
        return this.peliculasService.findByTitulo(titulo);
    }

    @Get('fechas/:desde/:hasta')
    findByFechas(
        @Param('desde') desde: string,
        @Param('hasta') hasta: string,
    ): Promise<Pelicula[]> {
        return this.peliculasService.findByFechas(desde, hasta);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Pelicula | null> {
        return this.peliculasService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createPeliculaDto: CreatePeliculaDto) {
        return this.peliculasService.update(+id, createPeliculaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.peliculasService.remove(+id);
    }
}
