import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
