import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { UserModel } from "src/user/user.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
    private authService: AuthService,
  ){
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string): Promise<UserModel> {
    const user = await this.authService.validateUser(email, password);

    if (!user){
      throw new BadRequestException('User not exist');
    }

    return user;
  }
}