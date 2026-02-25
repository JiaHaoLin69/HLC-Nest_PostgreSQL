import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';

@Injectable()
export class PeliculasService {
    constructor(
        @InjectRepository(Pelicula)
        private peliculaRepository: Repository<Pelicula>,
    ) { }

    create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
        const pelicula = this.peliculaRepository.create(createPeliculaDto);
        return this.peliculaRepository.save(pelicula);
    }

    findAll(): Promise<Pelicula[]> {
        return this.peliculaRepository.find();
    }

    findOne(id: number): Promise<Pelicula | null> {
        return this.peliculaRepository.findOneBy({ id });
    }

    findByTitulo(titulo: string): Promise<Pelicula[]> {
        return this.peliculaRepository.find({
            where: {
                titulo: Like(`%${titulo}%`),
            },
        });
    }

    findByFechas(desde: string, hasta: string): Promise<Pelicula[]> {
        return this.peliculaRepository.find({
            where: {
                fechaEstreno: Between(new Date(desde), new Date(hasta)),
            },
        });
    }

    update(id: number, updatePeliculaDto: CreatePeliculaDto): Promise<any> {
        return this.peliculaRepository.update(id, updatePeliculaDto);
    }

    async remove(id: number): Promise<void> {
        await this.peliculaRepository.delete(id);
    }

    async seed(): Promise<void> {
        const count = await this.peliculaRepository.count();
        if (count > 0) return;

        const peliculas: CreatePeliculaDto[] = [
            { titulo: 'El Padrino', director: 'Francis Ford Coppola', genero: 'Drama', fechaEstreno: new Date('1972-03-24'), duracion: 175 },
            { titulo: 'Pulp Fiction', director: 'Quentin Tarantino', genero: 'Crimen', fechaEstreno: new Date('1994-10-14'), duracion: 154 },
            { titulo: 'El Señor de los Anillos', director: 'Peter Jackson', genero: 'Fantasía', fechaEstreno: new Date('2001-12-19'), duracion: 178 },
            { titulo: 'Matrix', director: 'Lana Wachowski', genero: 'Ciencia Ficción', fechaEstreno: new Date('1999-03-31'), duracion: 136 },
            { titulo: 'Titanic', director: 'James Cameron', genero: 'Romance', fechaEstreno: new Date('1997-12-19'), duracion: 195 },
            { titulo: 'Interstellar', director: 'Christopher Nolan', genero: 'Ciencia Ficción', fechaEstreno: new Date('2014-11-07'), duracion: 169 },
            { titulo: 'Gladiator', director: 'Ridley Scott', genero: 'Acción', fechaEstreno: new Date('2000-05-05'), duracion: 155 },
            { titulo: 'Parásitos', director: 'Bong Joon-ho', genero: 'Drama', fechaEstreno: new Date('2019-05-30'), duracion: 132 },
            { titulo: 'Spider-Man: No Way Home', director: 'Jon Watts', genero: 'Acción', fechaEstreno: new Date('2021-12-17'), duracion: 148 },
            { titulo: 'Oppenheimer', director: 'Christopher Nolan', genero: 'Drama', fechaEstreno: new Date('2023-07-21'), duracion: 180 },
        ];

        for (const p of peliculas) {
            const pelicula = this.peliculaRepository.create(p);
            await this.peliculaRepository.save(pelicula);
        }
        console.log('Seed de películas insertado correctamente');
    }
}
