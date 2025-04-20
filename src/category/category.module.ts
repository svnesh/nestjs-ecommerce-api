import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModel } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ CategoryModel, ])
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
