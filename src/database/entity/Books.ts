import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; 
@Entity() 
export class Books { 

   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   name: string;
   
   @Column() 
   authorname: string;
   
   @Column("text") 
   description: string; 

   @Column('float') 
   paperBackPrice: number;
   
   @Column('float') 
   price: number;
   
   @Column() 
   dateofissue: string;
   
   @Column() 
   rating: number;
   
   @Column() 
   cover: string;
   
   @Column() 
   status: string; 
}
