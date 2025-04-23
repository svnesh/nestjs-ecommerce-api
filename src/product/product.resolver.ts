import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductModel } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetProductsInput } from './dto/get-products.inputs';
import { ProductFilterInput } from './dto/product-filter.inputs';
import { PaginatedProductsOutput } from './dto/paginated-products.output';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => ProductModel)
@UseGuards(GqlAuthGuard, RolesGuard)
export class ProductResolver {

  constructor(
    private readonly productService: ProductService,
  ){ }

  @Query(() => PaginatedProductsOutput)
  async getProducts(
    @Args('input') input: GetProductsInput,
    @Args('filter', { nullable: true}) filter?: ProductFilterInput,
  ) {
    return this.productService.getPaginatedProducts(input, filter);
  }

  @Query(() => ProductModel, { nullable: true })
  async getProduct(@Args('id') id: string): Promise<ProductModel | null> {
    return this.productService.getProduct(id);
  }

  @Roles(Role.ADMIN)
  @Mutation(() => ProductModel)
  async addProduct(
    @Args('addProduct') createProductDto: CreateProductDto,
    @CurrentUser() user: any,
  ): Promise<ProductModel> {
    return this.productService.createProduct(createProductDto, user);
  }

  @Mutation(() => ProductModel)
  async updateProduct(@Args('id') id: string, @Args('updateProduct') updateProductDto: CreateProductDto): Promise<any> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Mutation(() => String )
  async deleteProduct(@Args('id') id: string): Promise<any> {
    return this.productService.deleteProduct(id);
  }

  @Query(() => [ProductModel], { name: 'getProductsByCategoryName' })
  findProductByCategoryName(
    @Args('name', { type: () => String }) name: string) {
    return this.productService.findProductByCategoryName(name);
  }
  
}






/*-------------------- Graphql ------------- */
// query GetProduct {
//   getProduct(id: "d6898b0a-6452-41c7-80dc-982950920d46") {
//       createdAt
//       createdBy
//       id
//       name
//       description
//       price
//       category {
//           name
//           description
//       }
//   }
// }









/* -------------------- Graphql queries ------------- */
// query GetProducts {
//   getProducts(input: { limit: 2 }) {
//       hasMore
//       products {
//           id
//           name
//           description
//           price
//       }
//   }
// }
