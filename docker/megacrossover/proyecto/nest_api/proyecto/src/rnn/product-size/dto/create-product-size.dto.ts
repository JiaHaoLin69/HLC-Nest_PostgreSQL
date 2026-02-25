import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator"

export class ProductoTallaDto {
  @IsNotEmpty()
  productoId: number
  @IsNotEmpty()
  tallaId: number

  @IsNotEmpty()
  precio: number
}