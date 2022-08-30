import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Books } from './Books';

@Entity()
export class Genres {
  @PrimaryGeneratedColumn()
   id: number;

  @Column({ nullable: false, type: 'varchar' })
   name: string;

  @ManyToMany(() => Books, (book) => book.genres)
  books: Books[];
}
