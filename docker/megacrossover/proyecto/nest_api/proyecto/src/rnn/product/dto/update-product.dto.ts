import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductoDto) {}
