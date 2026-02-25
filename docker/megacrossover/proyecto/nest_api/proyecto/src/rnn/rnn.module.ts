import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TallaModule } from './talla/talla.module';
import { ProductSizeModule } from './product-size/product-size.module';

@Module({
  imports: [ProductModule, TallaModule, ProductSizeModule]
})
export class RnnModule {}
