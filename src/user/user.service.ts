import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { username, password, role } = createUserDto;
      const user = new User();
      user.username = username;
      user.password = password;
      user.role = role;
      return this.userRepository.save(user);
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    try {
      const User = await this.userRepository.findOne({ where: { id } });
      if (!User) {
        throw new NotFoundException('User not found');
      }
      return User;
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const User = await this.userRepository.findOneBy({ id });
      if (!User) {
        throw new BadRequestException('User not found');
      }
      return await this.userRepository.save({ ...User, ...updateUserDto });
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
