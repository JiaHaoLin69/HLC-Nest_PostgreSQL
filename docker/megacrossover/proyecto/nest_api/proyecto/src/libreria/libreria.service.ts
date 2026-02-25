import { Injectable } from '@nestjs/common';
import { CreateLibreriaDto } from './dto/create-libreria.dto';
import { UpdateLibreriaDto } from './dto/update-libreria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Libreria } from './entities/libreria.entity';
import { Between, MoreThan, Repository } from 'typeorm';

@Injectable()
export class LibreriaService {
  constructor(
      @InjectRepository(Libreria)
      private libreriaRepository: Repository<Libreria>,
    ) {}
  create(createLibreriaDto: CreateLibreriaDto): Promise<Libreria> {
      const libro = this.libreriaRepository.create(createLibreriaDto);
      return this.libreriaRepository.save(libro);
    }

  findAll() {
      return this.libreriaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} libreria`;
  }
  findByAuthor(id:number){
    return this.libreriaRepository.find({
    where: { 
      author: "Domingo López Oller"
    }
});

  }
  findByQuantity(num:number){
    return this.libreriaRepository.find({
    where: {
    quantity: MoreThan (num)
  }
});
  }

  update(id: number, createLibreriaDto: CreateLibreriaDto) {
    return `This action updates a #${id} libreria`;
  }

  remove(id: number) {
    return `This action removes a #${id} libreria`;
  }
}
