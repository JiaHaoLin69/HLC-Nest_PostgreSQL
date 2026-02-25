import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Post()
    create(@Body() createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        return this.pokemonService.create(createPokemonDto);
    }

    @Get()
    findAll(): Promise<Pokemon[]> {
        return this.pokemonService.findAll();
    }

    @Get('nombre/:nombre')
    findByNombre(@Param('nombre') nombre: string): Promise<Pokemon[]> {
        return this.pokemonService.findByNombre(nombre);
    }

    @Get('tipo/:tipo')
    findByTipo(@Param('tipo') tipo: string): Promise<Pokemon[]> {
        return this.pokemonService.findByTipo(tipo);
    }

    @Get('hp/:hp')
    findByHpGreaterThan(@Param('hp') hp: string): Promise<Pokemon[]> {
        return this.pokemonService.findByHpGreaterThan(+hp);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Pokemon | null> {
        return this.pokemonService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.update(+id, createPokemonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pokemonService.remove(+id);
    }
}
