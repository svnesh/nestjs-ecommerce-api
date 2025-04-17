import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class ProductFilterInput {
  
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  minPrice?: number;

  @Field({ nullable: true })
  maxPrice?: number;

}