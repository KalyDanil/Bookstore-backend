import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from './Books';
import { Users } from './Users';

@Entity()
export class BookRatings {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: false, type: 'integer' })
  public bookId!: number;

  @Column({ nullable: false, type: 'integer' })
  public userId!: number;

  @Column({ nullable: false, type: 'integer' })
  public rating!: number;

  @ManyToOne(() => Books, (book) => book.bookRatings)
  public book!: Books;

  @ManyToOne(() => Users, (user) => user.bookRatings)
  public user!: Users;
}
