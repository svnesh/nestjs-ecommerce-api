import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class GetProductsInput {

  @Field({ nullable: true })
  after?: string;

  @Field({ nullable: true })
  limit?: number;
}