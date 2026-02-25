import { ProductoTalla } from "src/rnn/product-size/entities/product-size.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Talla {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @OneToMany(
    () => ProductoTalla,
    (productoTalla) => productoTalla.talla,
  )
  productoTallas: ProductoTalla[]
}