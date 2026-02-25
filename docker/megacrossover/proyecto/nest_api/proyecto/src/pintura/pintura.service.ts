import { Injectable } from '@nestjs/common';
import { CreatePinturaDto } from './dto/create-pintura.dto';
import { UpdatePinturaDto } from './dto/update-pintura.dto';

@Injectable()
export class PinturaService {
  create(createPinturaDto: CreatePinturaDto) {
    return 'This action adds a new pintura';
  }

  findAll() {
    return `This action returns all pintura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pintura`;
  }

  update(id: number, updatePinturaDto: UpdatePinturaDto) {
    return `This action updates a #${id} pintura`;
  }

  remove(id: number) {
    return `This action removes a #${id} pintura`;
  }
}
