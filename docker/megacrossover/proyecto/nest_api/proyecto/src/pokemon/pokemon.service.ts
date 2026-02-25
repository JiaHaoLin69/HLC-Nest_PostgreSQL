import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>,
    ) { }

    create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        const pokemon = this.pokemonRepository.create(createPokemonDto);
        return this.pokemonRepository.save(pokemon);
    }

    findAll(): Promise<Pokemon[]> {
        return this.pokemonRepository.find();
    }

    findOne(id: number): Promise<Pokemon | null> {
        return this.pokemonRepository.findOneBy({ id });
    }

    findByNombre(nombre: string): Promise<Pokemon[]> {
        return this.pokemonRepository.find({
            where: {
                nombre: Like(`%${nombre}%`),
            },
        });
    }

    findByTipo(tipo: string): Promise<Pokemon[]> {
        return this.pokemonRepository.find({
            where: {
                tipo: tipo,
            },
        });
    }

    findByHpGreaterThan(hp: number): Promise<Pokemon[]> {
        return this.pokemonRepository.find({
            where: {
                hp: MoreThan(hp),
            },
        });
    }

    update(id: number, updatePokemonDto: CreatePokemonDto): Promise<any> {
        return this.pokemonRepository.update(id, updatePokemonDto);
    }

    async remove(id: number): Promise<void> {
        await this.pokemonRepository.delete(id);
    }

    async seed(): Promise<void> {
        const count = await this.pokemonRepository.count();
        if (count > 0) return;

        const pokemons: CreatePokemonDto[] = [
            { nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55, defensa: 40 },
            { nombre: 'Charizard', tipo: 'Fuego', hp: 78, ataque: 84, defensa: 78 },
            { nombre: 'Blastoise', tipo: 'Agua', hp: 79, ataque: 83, defensa: 100 },
            { nombre: 'Venusaur', tipo: 'Planta', hp: 80, ataque: 82, defensa: 83 },
            { nombre: 'Gengar', tipo: 'Fantasma', hp: 60, ataque: 65, defensa: 60 },
            { nombre: 'Snorlax', tipo: 'Normal', hp: 160, ataque: 110, defensa: 65 },
            { nombre: 'Mewtwo', tipo: 'Psíquico', hp: 106, ataque: 110, defensa: 90 },
            { nombre: 'Gyarados', tipo: 'Agua', hp: 95, ataque: 125, defensa: 79 },
            { nombre: 'Dragonite', tipo: 'Dragón', hp: 91, ataque: 134, defensa: 95 },
            { nombre: 'Jolteon', tipo: 'Eléctrico', hp: 65, ataque: 65, defensa: 60 },
        ];

        for (const p of pokemons) {
            const pokemon = this.pokemonRepository.create(p);
            await this.pokemonRepository.save(pokemon);
        }
        console.log('Seed de pokemon insertado correctamente');
    }
}
