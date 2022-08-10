import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    fullName: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    avatar: string = 'profileLink.svg'

}
