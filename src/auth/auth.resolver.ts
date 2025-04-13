import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { AuthMutationResponse } from './auth-mutation.response';
import { CurrentUser } from './decorators/current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthService,
  ){}

  @Mutation(() => AuthMutationResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthMutationResponse>{
    const user =  await this.authService.validateUser(email, password);
    if (!user) throw new BadRequestException('User not exists');
    const token = await this.authService.login(user);
    return { access_token: token.access_token, refresh_token: token.refresh_token };
  }

  @Mutation(() => AuthMutationResponse)
  async refreshLogin(
    @Args('userId') userId: string,
    @Args('refreshToken') refreshToken: string,
  ): Promise<AuthMutationResponse>{
    const refreshed = await this.authService.refreshToken(userId, refreshToken);
    return { access_token: refreshed.access_token, refresh_token: refreshed.refresh_token };
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logout(@CurrentUser() user: any){
    await this.authService.logout(user.userId);
    return true;
  }
}
