import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Productos } from './products.interface';
import { ProductsDto } from './dto/products.dto/products.dto';
interface datos { "id": string, "size": string };

interface entrada { articulo: string, precio: number };

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    //Conectando con el servicio
    @Get()
    getAllProducts(): Productos[] {
        return this.productsService.getAllProducts();
    }
    @Get(':id')
    getProduct(@Param('id') id: number) {
        return this.productsService.getId(id);
    }
    @Get('total')
    getTotal() {
        return this.productsService.total();
    }
    @Post()
    createProduct(@Body()nuevo: ProductsDto): string {
        return this.productsService.insert(nuevo);
    }

    @Delete(':id')
    borrarId(@Param('id') id: number) {
        return this.productsService.delete(id);
    }

    @Put(':id')
    actualiazaProducto(@Param('id') id: number,
        @Body() body) {
        return this.productsService.update(id, body);
    }





    //Lo que había antes del 13/02/2026
    // @Get()
    // findProducts():string{
    //     return this.productService.getAllProducts();
    // }
    // @Get('hot')
    // FindByHot():string {
    //     return "Te vamos a mostrar los productos más calientes!!";
    // }
    // @Get('hot/:id')
    // findHotByID(@Param() params):string {
    //     return `Estás consultando el producto ${params.id} de entre todos los productos calientes`;
    // }
    // @Get('buscar')
    // findBuscar(@Query() consulta:unknown){
    //     return consulta;
    // }
    // @Get(':id')
    // findByID( @Param() params):string {
    //     return `Estás consultando el producto ${params.id}`;
    // }
    // @Get(':id/:size')
    // findByIDSize( @Param() params:datos):string{
    //     return `Estás leyendo un producto ${params.id} y tamaño ${params.size}`;
    // }


    // // @Post()
    // // // @HttpCode(HttpStatus.NO_CONTENT)
    // // insertProduct(@Body() body:entrada){
    // //     return {message:"Inserción correcta", body,statusCode:HttpStatus.NO_CONTENT};
    // // }
    // @Post()
    // // @HttpCode(HttpStatus.NO_CONTENT)
    // insertProduct(@Body('articulo') articulo:string,@Body('precio') precio:number){
    //     return {message:"Inserción correcta",statusCode:HttpStatus.NO_CONTENT};
    // }

    // @Put(':id')
    // actualizaByID(@Body() body:entrada,@Param('id') id:string){
    //     return {message:`Regsitro ${id} acutualizado`,body};
    // }
    // @Patch(':id')
    // actualizaByIDPatch(@Body() body:entrada,@Param('id') id:string){
    //     return {message:`Regsitro ${id} acutualizado`,body};
    // }

    // @Delete(':id')
    // borrar(@Param('id') id:string){
    //     return {message:`Regsitro ${id} borrado`};
    // }
}
