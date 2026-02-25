import { Module } from '@nestjs/common';
import { LibreriaService } from './libreria.service';
import { LibreriaController } from './libreria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libreria } from './entities/libreria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Libreria])],
  controllers: [LibreriaController],
  providers: [LibreriaService],
})
export class LibreriaModule {}
