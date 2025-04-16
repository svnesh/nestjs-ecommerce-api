import { Field, ObjectType } from "@nestjs/graphql";
import { ProductModel } from "../product.entity";


@ObjectType()
export class PaginatedProductsOutput {

  @Field(() => [ProductModel])
  products: ProductModel[];

  @Field({ nullable: true })
  hasMore: boolean;

}