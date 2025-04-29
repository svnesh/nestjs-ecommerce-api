import { Field, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class UpdateCartItemDto {
  
  @Field()
  productId: string;

}