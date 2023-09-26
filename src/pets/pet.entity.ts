import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//The primary reason for choosing Code First approach of graphql, instead of writing Schema in .gql is that,
//When we write entity in .ts, we can use is both for gql as well as for db Entity.
@Entity() //This is for DB
@ObjectType() // THis is for GQl
export class Pet {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field((type) => Int)
  ownerId: number;

  @Field((type) => Owner)
  @ManyToOne(() => Owner, (owner) => owner.pets)
  owner: Owner;
}
