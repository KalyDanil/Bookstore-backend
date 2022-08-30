import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Books } from './Books';
import { Users } from './Users';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: false, type: 'varchar' })
    commentator: string;

  @Column({ nullable: false, type: 'text' })
    comment: string;

  @Column({ nullable: false, type: 'varchar' })
    avatar: string;

  @Column({ nullable: false, type: 'timestamptz' })
    time: Date;

  @ManyToOne(() => Books, (book) => book.comments)
    book: Books;

  @ManyToOne(() => Users, (user) => user.comments)
    user: Users;
}
