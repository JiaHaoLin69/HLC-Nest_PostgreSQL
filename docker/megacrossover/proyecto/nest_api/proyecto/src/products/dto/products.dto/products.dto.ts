import { IsNumber, IsString, Min } from "class-validator";

export class ProductsDto {
    
    id:number;
    @IsString({message:"El artículo es un texto"})
    articulo:string;
    @Min(0,{message:"Tiene que ser positivo"})
    precio:number;
    stock?:number;
}
