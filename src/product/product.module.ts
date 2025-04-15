import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductModel])
  ],
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
