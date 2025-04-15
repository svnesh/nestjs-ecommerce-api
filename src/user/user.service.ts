import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const isUserExists = await this.userRepository.findOne({ where: {
      email: createUserDto.email
    }});

    if (isUserExists){
      throw new BadRequestException('Email already exists'); 
    }
    const encryptedPass = await bcrypt.hash(createUserDto.password, 10);
    const {password, ...allOthers} = createUserDto;
    const user = await this.userRepository.create({
      ...allOthers, 
      password: encryptedPass,
      createdAt: new Date(),
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<UserModel[]>{
    return this.userRepository.find()
  }

  async findOne(id: string): Promise<UserModel | null> {
    return this.userRepository.findOne({ where: { id } })
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    return this.userRepository.findOneByOrFail({ email });
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    const user = await this.findOne(id);
    if (!user){
      throw new BadRequestException('User not exists');
    }
    return this.userRepository.update(id, {
      hashedRefreshToken: refreshToken
    });
  }
}
