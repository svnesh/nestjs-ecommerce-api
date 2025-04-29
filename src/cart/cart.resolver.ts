import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartModel } from './cart.entity';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Resolver()
export class CartResolver {

  constructor(
    private readonly cartService: CartService,
  ) { }

  @Mutation(() => CartModel)
  async createCart(
    @Args('addCart') createCartDto: CreateCartDto,
    @CurrentUser() user: any,
  ) {
    return this.cartService.createCart(createCartDto, user);
  }

  @Query(() => [CartModel])
  async getUserCart(
    @CurrentUser() user: any,
  ) {
    return this.cartService.getUserCart(user);
  }

  @Mutation(() => String)
  async updateCart(
    @Args('id') id: string,
    @Args('updateCart') updateCartDto: UpdateCartDto,
  ): Promise<any> {
    return this.cartService.updateCart(id, updateCartDto);
  }

  @Mutation(() => CartModel)
  async removeCartItem(
    @Args('id') id: string,
    @Args('updateCartItem') updateCartItemDto: UpdateCartItemDto,
  ): Promise<any> {
    return this.cartService.removeCartItem(id, updateCartItemDto);
  }



}
