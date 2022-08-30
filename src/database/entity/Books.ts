import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BookRatings } from './BookRatings';
import { CartBooks } from './CartBooks';
import { Comments } from './Comments';
import { Genres } from './Genres';
import { LikedBooks } from './LikedBooks';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
   id: number;

  @Column({ nullable: false, type: 'varchar' })
   name: string;

  @Column({ nullable: false, type: 'text' })
   authorName: string;

  @Column({ nullable: false, type: 'text' })
   description: string;

  @Column({ nullable: false, type: 'float' })
   paperBackPrice: number;

  @Column({ nullable: false, type: 'float' })
   price: number;

  @Column({ nullable: false, type: 'varchar' })
   dateOfIssue: string;

  @Column({ nullable: true, type: 'integer' })
   rating: number;

  @Column({ nullable: false, type: 'varchar' })
   cover: string;

  @Column({ nullable: false, type: 'varchar' })
   status: string;

  @ManyToMany(() => Genres, (genre) => genre.books)
  @JoinTable()
    genres: Genres[];

  @OneToMany(() => BookRatings, (bookRating) => bookRating.book)
  public bookRatings!: BookRatings[];

  @OneToMany(() => LikedBooks, (likedBook) => likedBook.book)
  public likedBooks!: LikedBooks[];

  @OneToMany(() => CartBooks, (cartBook) => cartBook.book)
  public cartBooks!: CartBooks[];

  @OneToMany(() => Comments, (comment) => comment.book)
    comments: Comments[];
}
