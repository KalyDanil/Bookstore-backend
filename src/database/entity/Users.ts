import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: true, type: 'character varying' })
    fullName: string;

  @Column({ unique: true, nullable: false, type: 'character varying' })
    email: string;

  @Column({ nullable: false, type: 'character varying', select: false })
    password: string;

  @Column({ nullable: true, type: 'character varying' })
    avatar: string;
}
