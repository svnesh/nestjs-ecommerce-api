import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


@InputType()
export class CreateCartDto {

  @Field()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

}