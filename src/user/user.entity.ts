import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class UserModel {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

}
