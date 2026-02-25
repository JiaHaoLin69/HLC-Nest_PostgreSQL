import { HttpStatus, Injectable } from '@nestjs/common';
import { Productos } from './products.interface';
import { ProductsDto } from './dto/products.dto/products.dto';

@Injectable()
export class ProductsService {

    private products: Productos[] = [];
    getAllProducts(): Productos[] {
        return this.products;
    }
    insert(product:Productos): string {
        this.products = [
            ...this.products,
            product
        ];
        return "Nuevo producto insertado";

    }

    //Obtener el producto indicado (products/1)
    getId(id: number) {
        return this.products.find((item: Productos) => item.id == id);
    }

    //Modificar el producto indicado con los parámetros del body
    update(id: number, body: any) {
        let product: Productos = {
            id,
            articulo: body.articulo,
            precio: body.precio,
        }
        this.products = this.products.map((item: Productos) => {
            console.log(item, id, item.id == id);
            return item.id == id ? product : item;
        });
    }
    //Borrar el producto indicado
    delete(id: number) {
        this.products = this.products.filter((item: Productos) => item.id != id);
    }

    //Total de prouctos 
    total(): number {
        return this.products.length - 1;
    }
}
