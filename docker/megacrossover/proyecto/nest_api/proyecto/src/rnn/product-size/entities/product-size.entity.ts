import { Producto } from "src/rnn/product/entities/product.entity"
import { Talla } from "src/rnn/talla/entities/talla.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ProductoTalla {
  @PrimaryGeneratedColumn()
  id: number

  @Column("decimal", { precision: 10, scale: 2 })
  precio: number

  @ManyToOne(
    () => Producto,
    (producto) => producto.productoTallas,
  )
  producto: Producto

  @ManyToOne(
    () => Talla,
    (talla) => talla.productoTallas,
  )
  talla: Talla
}