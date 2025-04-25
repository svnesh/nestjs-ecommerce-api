import { BadGatewayException, BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from './product.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsInput } from './dto/get-products.inputs';
import { PaginatedProductsOutput } from './dto/paginated-products.output';
import { ProductFilterInput } from './dto/product-filter.inputs';
import { create } from 'domain';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductModel) 
    private productRepository: Repository<ProductModel>,
  ) {}

  async createProduct(createProductDto: CreateProductDto, user: any): Promise<ProductModel> {
    const product = await this.productRepository.findOne({
      where: {
        name: Like(`${createProductDto.name}`)
      }
    });

    if (product){
      throw new BadRequestException('Product already exists');
    }

    const createProduct = new ProductModel();
    createProduct.name = createProductDto.name;
    createProduct.description = createProductDto.description;
    createProduct.price = createProductDto.price;
    createProduct.category = createProductDto.categoryId;
    createProduct.createdAt = new Date();
    createProduct.createdBy = user.id;

    const newProduct = await this.productRepository.create(createProduct);
    return this.productRepository.save(newProduct);
  }

  async updateProduct(id: string, updateProductDto: CreateProductDto): Promise<any> {

    const existingProduct = await this.productRepository.findOneBy({id: id});
    if (!existingProduct) throw new BadRequestException('Product not exists');

    const updateProduct = new ProductModel();
    updateProduct.name = updateProductDto.name;
    updateProduct.description = updateProductDto.description;
    updateProduct.price = updateProductDto.price;
    updateProduct.category = updateProductDto.categoryId;
    updateProduct.updatedAt = new Date();

    const updProduct = await this.productRepository.update(id, updateProduct)
    return this.getProduct(id);
  }

  async getAllProducts(): Promise<ProductModel[]>{
    return this.productRepository.find({ where: { deletedAt: IsNull() }});
  }

  async getPaginatedProducts(input: GetProductsInput, filter: any): Promise<PaginatedProductsOutput> {
    const { after, limit = 10 } = input;

    const query = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.createdAt', 'DESC')
      .take(limit + 1);

    if (after){
      const afterProduct = await this.productRepository.findOneBy({id: after});
      if (afterProduct){
        query.andWhere('product.createdAt < :afterId', { afterId: afterProduct.createdAt })
      }
    }

    if (filter?.search){
      query.andWhere('product.name ILIKE :search OR product.description ILIKE :search', {
        search: `%${filter.search}%`
      });
    }

    if (filter?.minPrice !== undefined){
      query.andWhere('product.price >= :minPrice', { minPrice: filter?.minPrice });
    }
    if (filter?.maxPrice !== undefined){
      query.andWhere('product.price <= :maxPrice', { maxPrice: filter?.maxPrice });
    }

    const products = await query.getMany();

    return {
      products: products.slice(0, limit),
      hasMore: products.length > limit
    }

  }

  async getProduct(id: string): Promise<ProductModel | null> {
    const product = await this.productRepository.findOne({ 
      where: {
        id: id, 
        deletedAt: IsNull() 
      },
      relations: { category: true } 
    })
    if (!product) throw new BadGatewayException('Product not exists');
    return product;
  }

  async deleteProduct(id: string): Promise<any> {
    const product = await this.productRepository.findOne({ where: {id: id, deletedAt: IsNull() } })
    if (!product) throw new BadGatewayException('Product not exists');
    return this.productRepository
      .update(id, { deletedAt: new Date() })
      .then((res) => {
        if (res) return id;
      })
  }
  
  async findProductByCategoryName(name: string): Promise<any[]> {
    return this.productRepository.createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .where('category.name = :name', { name })
      .andWhere('category.deletedAt IS NULL')
      .andWhere('product.deletedAt IS NULL')
      .orderBy('product.createdAt', 'DESC')
      .getMany()
  }

  async addProductImage(id: string, imageUrl: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: id, deletedAt: IsNull() } });
    if (!product) throw new BadRequestException('Product not exists');
    product.imageUrl = imageUrl;
    await this.productRepository.save(product);
  }

}
