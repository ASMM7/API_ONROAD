import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './entities/user.entity'
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';



export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}



  async create(createUserDto: CreateUserDto):Promise<User> {

    const{username,password,role}= createUserDto;
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find() ;
  }

  async findUserById(id: number): Promise<User> {
    const User = await this.userRepository.findOne({where: {id}});
    if(!User){  
      throw new NotFoundException('User not found');
    }
  return User;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const User = await this.userRepository.findOneBy({id})
    if(!User){
      throw new BadRequestException('User not found');
    }
    return await this.userRepository.save({ ...User, ...updateUserDto });
  }

  async remove(id: number){
    return await this.userRepository.delete(id);

  }
}
