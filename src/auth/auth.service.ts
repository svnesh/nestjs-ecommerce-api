import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
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
    const payload = { username: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }


}
