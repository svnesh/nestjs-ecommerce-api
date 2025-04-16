import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductModel } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetProductsInput } from './dto/get-products.inputs';

@Resolver(() => ProductModel)
@UseGuards(GqlAuthGuard)
export class ProductResolver {

  constructor(
    private readonly productService: ProductService,
  ){ }

  @Query(() => [ProductModel])
  async getProducts(@Args('input') input: GetProductsInput) {
    return this.productService.getPaginatedProducts(input);
  }

  @Query(() => ProductModel, { nullable: true })
  async getProduct(@Args('id') id: string): Promise<ProductModel | null> {
    return this.productService.getProduct(id);
  }

  @Mutation(() => ProductModel)
  async addProduct(@Args('addProduct') createProductDto: CreateProductDto): Promise<ProductModel> {
    return this.productService.createProduct(createProductDto);
  }

  @Mutation(() => ProductModel)
  async updateProduct(@Args('id') id: string, @Args('updateProduct') updateProductDto: CreateProductDto): Promise<any> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Mutation(() => String )
  async deleteProduct(@Args('id') id: string): Promise<any> {
    return this.productService.deleteProduct(id);
  }


}
