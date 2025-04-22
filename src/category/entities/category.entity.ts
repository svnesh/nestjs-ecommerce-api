import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base.entity';
import { ProductModel } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class CategoryModel extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true})
  name: string;

  @Field()
  @Column({ nullable: true})
  description: string;

  @OneToMany(() => ProductModel, (product) => product.category)
  products: ProductModel[];
}
