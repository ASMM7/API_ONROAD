import { Itinerario } from 'src/itinerario/entities/itinerario.entity';
import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItinerarioService {
  constructor(
    @InjectRepository(Itinerario)
    private readonly itinerarioRepository: Repository<Itinerario>,
  ) {}

  async create(createItinerarioDto: CreateItinerarioDto): Promise<Itinerario> {
    try {
      const itinerario = this.itinerarioRepository.create(createItinerarioDto);
      return this.itinerarioRepository.save(itinerario);
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async findAll(): Promise<Itinerario[]> {
    return this.itinerarioRepository.find();
  }

  async findItinerarioById(id: number): Promise<Itinerario> {
    try {
      const itinerario = await this.itinerarioRepository.findOne({
        where: { id },
      });
      if (!itinerario) {
        throw new NotFoundException('El itinerario no found');
      }
      return itinerario;
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }


  async update(id: number, updateItinerarioDto: UpdateItinerarioDto) {
    try {
      const itinerario = await this.itinerarioRepository.findOneBy({ id });
      if (!itinerario) {
        throw new BadRequestException('El itinerario no found');
      }
      return this.itinerarioRepository.save({
        ...itinerario,
        ...updateItinerarioDto,
      });
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async remove(id: number) {
    try {
      const itinerario = await this.itinerarioRepository.delete(id);
      if (!itinerario) {
        throw new BadRequestException('El itinerario no found');
      }
      return itinerario;
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }
}
