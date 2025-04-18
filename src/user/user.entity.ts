import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

@ObjectType()
@Entity()
export class UserModel extends BaseEntity {

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

  @Column({ type:'text', nullable: true })
  hashedRefreshToken?: string | null;

  @Field()
  @Column({ type:'enum', enum: Role, default: Role.USER })
  role: Role;
  
}
