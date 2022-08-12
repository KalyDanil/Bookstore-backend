import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
   id: number;

  @Column({ nullable: false, type: 'character varying' })
   name: string;

  @Column({ nullable: false, type: 'text' })
   authorName: string;

  @Column({ nullable: false, type: 'text' })
   description: string;

  @Column({ nullable: false, type: 'float' })
   paperBackPrice: number;

  @Column({ nullable: false, type: 'float' })
   price: number;

  @Column({ nullable: false, type: 'character varying' })
   dateOfIssue: string;

  @Column({ nullable: false, type: 'number' })
   rating: number;

  @Column({ nullable: false, type: 'character varying' })
   cover: string;

  @Column({ nullable: false, type: 'character varying' })
   status: string;
}
