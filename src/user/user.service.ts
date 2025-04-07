import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';

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
      throw new BadRequestException() 
    }

    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<UserModel[]>{
    return this.userRepository.find()
  }

  async findOne(id: string): Promise<UserModel | null> {
    return this.userRepository.findOne({ where: { id } })
  }
}
