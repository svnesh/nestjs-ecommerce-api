import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    @Inject('JWT_REFRESH') private refreshJwtService: JwtService,
    private config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ){ }

  async validateUser(email: string, password: string): Promise<UserModel | null> {
    const user = await this.userService.findOneByEmail(email)
    if (user && await bcrypt.compare(password, user.password)){
      return user;
    }
    return null;
  }

  async login(user: UserModel){
    const payload = { username: user.email, sub: user.id };

    const access_token = this.jwtService.sign(payload)
    const refresh_token = this.refreshJwtService.sign(payload);

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    await this.userService.updateRefreshToken(payload.sub, hashedRefreshToken);

    return {
      access_token,
      refresh_token 
    }
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user: any = await this.userService.findOne(userId);

    const isValid = await bcrypt.compare(refreshToken, user?.hashedRefreshToken);
    if (!isValid) throw new ForbiddenException('Invalid refresh token');

    const payload = { username: user.email, sub: user.id };

    const access_token = this.jwtService.sign(payload)
    const refresh_token = this.refreshJwtService.sign(payload);

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    await this.userService.updateRefreshToken(payload.sub, hashedRefreshToken);

    return {
      access_token,
      refresh_token 
    }
  }

  async logout(userId: string) {
    return this.userService.updateRefreshToken(userId, null);
  }


}
