import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => UserModel)
@UseGuards(GqlAuthGuard)
export class UserResolver {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(() => [UserModel])
  async getUsers(): Promise<UserModel[]>{
    return this.userService.findAll();
  }

  @Query(() => UserModel, { nullable: true})
  async getUser(@Args('id') id: string): Promise<UserModel | null> {
    return this.userService.findOne(id);
  }
  
  @Mutation(() => UserModel)
  async createUser(@Args('createUser') createUserDto: CreateUserDto): Promise<UserModel>{
    return this.userService.create(createUserDto);
  }

}



/*==========================

mutation{
  createUser(createUser: { username: "admin", email: "admin@org.com", password: "12345" }) {
    id
    email
  }
}


query{
  getUsers {
    username
    email
    createdAt
  }
}

query{
  getUser(id: "9c087bac-cf6c-4db9-8f7a-e126d55984ea") {
    username
    email
    createdAt
  }
}

*/