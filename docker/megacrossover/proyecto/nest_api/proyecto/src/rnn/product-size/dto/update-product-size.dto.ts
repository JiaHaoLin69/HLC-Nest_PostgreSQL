import { PartialType } from '@nestjs/mapped-types';
import { ProductoTallaDto } from './create-product-size.dto';

export class UpdateProductSizeDto extends PartialType(ProductoTallaDto) {}
