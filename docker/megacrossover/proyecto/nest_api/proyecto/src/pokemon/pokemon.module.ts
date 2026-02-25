import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Pokemon])],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class PokemonModule implements OnModuleInit {
    constructor(private readonly pokemonService: PokemonService) { }

    async onModuleInit() {
        await this.pokemonService.seed();
    }
}
