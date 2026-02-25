import { Module } from '@nestjs/common';
import { PinturaService } from './pintura.service';
import { PinturaController } from './pintura.controller';

@Module({
  
  controllers: [PinturaController],
  providers: [PinturaService],
})
export class PinturaModule {}
