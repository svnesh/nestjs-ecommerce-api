import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ){ }

  async login(user: UserModel){
    const payload = { username: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }


}
