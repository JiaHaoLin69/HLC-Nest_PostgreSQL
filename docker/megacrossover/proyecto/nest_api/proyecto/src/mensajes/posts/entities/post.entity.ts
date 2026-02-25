import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  titulo: string;
  @Column()
  contenido: string;
  @Column({ default: false }) 
  publicado: boolean;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}