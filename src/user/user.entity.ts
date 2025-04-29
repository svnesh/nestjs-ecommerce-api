import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CartModel } from "src/cart/cart.entity";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

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
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type:'text', nullable: true })
  hashedRefreshToken?: string | null;

  @Field()
  @Column({ type:'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => CartModel, (cart) => cart.user)
  carts: CartModel[]; 
  
}
