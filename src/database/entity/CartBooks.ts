import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from './Books';
import { Users } from './Users';

@Entity()
export class CartBooks {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: false, type: 'integer' })
  public bookId!: number;

  @Column({ nullable: false, type: 'integer' })
  public userId!: number;

  @Column({ nullable: false, type: 'integer' })
  public amount!: number;

  @ManyToOne(() => Books, (book) => book.cartBooks)
  public book!: Books;

  @ManyToOne(() => Users, (user) => user.cartBooks)
  public user!: Users;
}
