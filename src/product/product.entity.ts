import { Field, ID, ObjectType } from "@nestjs/graphql";
import { join } from "path";
import { CartModel } from "src/cart/cart.entity";
import { CategoryModel } from "src/category/entities/category.entity";
import { BaseEntity } from "src/common/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

@ObjectType()
@Entity()
export class ProductModel extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({  nullable: true })
  description: string;

  @Field()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @Field(() => CategoryModel, { nullable: true })
  @ManyToOne(() => CategoryModel, (category) => category.products, { nullable: true})
  @JoinColumn({ name: 'categoryId' })
  category: CategoryModel | string;

  @OneToMany(() => CartModel, (cart) => cart.product)
  carts: CartModel[];
}