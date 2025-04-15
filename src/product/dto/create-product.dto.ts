import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";


@InputType()
export class CreateProductDto {

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

}