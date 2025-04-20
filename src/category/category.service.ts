import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryModel } from './entities/category.entity';
import { IsNull, Like, Not, Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryModel) private categoryRepository: Repository<CategoryModel>,
  ){}

  async create(createCategoryInput: CreateCategoryDto, user: any): Promise<CategoryModel> {
    const category = await this.categoryRepository.find({ where: { name: Like(`${createCategoryInput.name}`), deletedAt: IsNull() }});
    if (category.length > 0) {
      throw new BadRequestException('Category already exists');
    }
  
    const newCategory = new CategoryModel();
    newCategory.name = createCategoryInput.name;
    newCategory.description = createCategoryInput.description;
    newCategory.createdAt = new Date();
    newCategory.createdBy = user?.id;

    const createdCategory = await this.categoryRepository.create(newCategory);

    return this.categoryRepository.save(createdCategory);
  }

  findAll(): Promise<CategoryModel[]> {
    return this.categoryRepository.find({ where: { deletedAt: IsNull() }});
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({ where: { id: id, deletedAt: IsNull() }});
  }

  async update(id: string, updateCategoryInput: UpdateCategoryDto): Promise<CategoryModel | null> {
    const existingCategory = await this.categoryRepository.find({ where: {
      name: Like(`${updateCategoryInput.name}`),
      id: Not(id),
      deletedAt: IsNull()
    } });

    if (existingCategory.length > 0) {
      throw new BadRequestException('Category already exists');
    }
    const updateCategory = new CategoryModel();
    updateCategory.name = updateCategoryInput.name;
    updateCategory.description = updateCategoryInput.description;
    updateCategory.updatedAt = new Date();
    await this.categoryRepository.update(id, updateCategory);
    return this.categoryRepository.findOne({ where: { id: id, deletedAt: IsNull() }});
  }

  async remove(id: string) {
    const removedCategory = await this.categoryRepository.update(id, { deletedAt: new Date() });
    let response = removedCategory ? { message: 'Category deleted successfully' } : { message: 'Category not found' };
    return response;
  }
}
