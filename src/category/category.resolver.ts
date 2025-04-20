import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryModel } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => CategoryModel)
@UseGuards(GqlAuthGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryModel)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryDto,
    @CurrentUser() user: any,
  ) {
    return this.categoryService.create(createCategoryInput, user);
  }

  @Query(() => [CategoryModel], { name: 'category' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryModel, { name: 'category' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => CategoryModel)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryDto, 
    @CurrentUser() user: any,
  ) {
    return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Mutation(() => CategoryModel)
  removeCategory(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.remove(id);
  }
}
