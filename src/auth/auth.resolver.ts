import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthService,
  ){}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string>{
    const user =  await this.authService.validateUser(email, password);
    if (!user) throw new BadRequestException('User not exists');
    const token = await this.authService.login(user);
    return token.access_token;
  }
}
