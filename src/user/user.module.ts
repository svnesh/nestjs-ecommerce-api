import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel])
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
