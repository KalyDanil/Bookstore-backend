import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from './Books';
import { Users } from './Users';

@Entity()
export class LikedBooks {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: false, type: 'integer' })
  public bookId!: number;

  @Column({ nullable: false, type: 'integer' })
  public userId!: number;

  @ManyToOne(() => Books, (book) => book.likedBooks)
  public book!: Books;

  @ManyToOne(() => Users, (user) => user.likedBooks)
  public user!: Users;
}
