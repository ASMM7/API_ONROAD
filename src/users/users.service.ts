import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly userRepository: Repository<UsuarioEntity>
  ){}

  async findOneByEmail(email: string): Promise<UsuarioEntity> {
    return this.userRepository.findOne({
      where:{
        email
      }
    });
  
  }

  async create(createUserDto: CreateUserDto) {
    try {

      const existeUser = await this.userRepository.findOneBy({
        name: createUserDto.name,
      });
      if(existeUser){
        throw new HttpException('User already exits', HttpStatus.CONFLICT);
      }

      const user = this.userRepository.create(createUserDto)
      return this.userRepository.save(user);
    } catch (e) {
      return{ error: e,};
    }
  }
  
  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const User = await this.userRepository.findOne({ where: { id } });
      if (!User) {
        return new HttpException('User not found',HttpStatus.NOT_FOUND);
      }
      return User;
    } catch (e) {
      return{ error: e,};
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto){
    try {
      const User = await this.userRepository.findOneBy({ id });
      
      if (!User) {
        throw new BadRequestException('User not found');
      }
      return await this.userRepository.save({ ...User, ...updateUserDto });
    } catch (e) {
      return{ error: e,};
    }
  }

  async remove(id: number) {
    const userFound = await this.userRepository.findOne({where:{id}});
    if(!userFound){
      return new HttpException('User not found',HttpStatus.NOT_FOUND)
    }
    return this.userRepository.delete(id);
  }
}
