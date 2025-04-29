import { Injectable } from '@nestjs/common';
import { CartModel } from './cart.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(CartModel) private cartRepository: Repository<CartModel>,
  ) { }

  async createCart(createCartDto: CreateCartDto, user: any): Promise<CartModel>{
    const cart = await this.cartRepository.findOne({
      where: {
        product: createCartDto.productId,
        user: user.id,
      }
    });

    if (cart) {
      cart.quantity += createCartDto.quantity;
      return this.cartRepository.save(cart);
    }

    const newCart = new CartModel();
    newCart.product = createCartDto.productId;
    newCart.user = user.id;
    newCart.quantity = createCartDto.quantity;
    newCart.createdAt = new Date();
    newCart.createdBy = user.id;

    return this.cartRepository.save(newCart);
  } 

  async updateCart(id: string, updateCartDto: UpdateCartDto,
  ): Promise<any> {
    const existingCart =  await this.cartRepository.findOneBy({ id: id });
    if (!existingCart) throw new Error('Cart not exists');

    const updateCart = new CartModel();
    updateCart.product = updateCartDto?.productId || existingCart.product;
    updateCart.quantity = updateCartDto?.quantity || existingCart.quantity;
    updateCart.updatedAt = new Date();

    return this.cartRepository.update(id, updateCart);
  }

  async removeCartItem(id: string, updateCartItemDto: UpdateCartItemDto,
  ): Promise<any> {
    const existingCart = await this.cartRepository.findOneBy({ id: id });
    if (!existingCart) throw new Error('Cart not exists');

    return await this.cartRepository.update(
      {
      id: id, 
      product: updateCartItemDto.productId
      }, 
      {
        deletedAt: new Date(),
      })  
  }
  

  async getUserCart(user: any): Promise<CartModel[]> {
    return await this.cartRepository.find({
      where: {
        user: user.id,
        deletedAt: IsNull(),
      },
      relations: ['product']
      })
      .then((cart) => {
        if (!cart) throw new Error('Cart not found');
        return cart;
      })
  }

}
