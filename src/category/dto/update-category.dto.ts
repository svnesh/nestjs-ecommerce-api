import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateCategoryDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsString()
  name: string;
  
  @Field()
  @IsString()
  description: string;
}
