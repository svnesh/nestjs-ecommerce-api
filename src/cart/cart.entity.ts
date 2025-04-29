import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/common/base.entity";
import { ProductModel } from "src/product/product.entity";
import { UserModel } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class CartModel extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  quantity: number;

  @Field(() => ProductModel)
  @ManyToOne(() => ProductModel, (product) => product.carts)
  @JoinColumn({ name: 'productId' })
  product: ProductModel | string;

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.carts)
  @JoinColumn({ name: 'userId' })
  user: UserModel | string;

}