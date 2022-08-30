import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookRatings } from './BookRatings';
import { CartBooks } from './CartBooks';
import { Comments } from './Comments';
import { LikedBooks } from './LikedBooks';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: true, type: 'varchar' })
    fullName: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
    email: string;

  @Column({ nullable: false, type: 'varchar', select: false })
    password: string;

  @Column({ nullable: true, type: 'varchar' })
    avatar: string;

  @OneToMany(() => BookRatings, (bookRating) => bookRating.user)
  public bookRatings!: BookRatings[];

  @OneToMany(() => LikedBooks, (likedBook) => likedBook.user)
  public likedBooks!: LikedBooks[];

  @OneToMany(() => CartBooks, (cartBook) => cartBook.user)
  public cartBooks!: CartBooks[];

  @OneToMany(() => Comments, (comment) => comment.user)
    comments: Comments[];
}
