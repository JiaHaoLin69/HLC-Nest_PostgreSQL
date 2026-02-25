import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { PeliculasService } from './peliculas.service';
import { PeliculasController } from './peliculas.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Pelicula])],
    controllers: [PeliculasController],
    providers: [PeliculasService],
})
export class PeliculasModule implements OnModuleInit {
    constructor(private readonly peliculasService: PeliculasService) { }

    async onModuleInit() {
        await this.peliculasService.seed();
    }
}
