import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { Bus } from './entities/bus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerario } from 'src/itinerario/entities/itinerario.entity';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private busRepository: Repository<Bus>,

    @InjectRepository(Itinerario)
    private itinerarioRepository: Repository<Itinerario>,
  ) {}

  async create(createBusDto: CreateBusDto) {
    try {
      const itinerario = await this.itinerarioRepository.findOneBy({
        id: createBusDto.itinerario,
      });

      if (!itinerario) {
        throw new BadRequestException('Itinerario not found');
      }

      const { plateNumber, operator, seatCapacity, type_seat, added_value } =
        createBusDto;

      const existeBus = await this.busRepository.findOneBy({ plateNumber });

      if (existeBus) {
        throw new HttpException('Bus already exists', HttpStatus.CONFLICT);
      }

      const bus = this.busRepository.create({
        plateNumber,
        operator,
        seatCapacity,
        type_seat,
        added_value
      });

      return await this.busRepository.save(bus);
    } catch (e) {
      return {
        error: e,
      };
    }
  }

  async findAll(): Promise<Bus[]> {
    return this.busRepository.find();
  }

  async findBusById(id: number): Promise<Bus> {
    const bus = await this.busRepository.findOne({ where: { id } });
    if (!bus) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return bus;
  }

  async update(id: number, updateBusDto: UpdateBusDto): Promise<Bus> {
    const bus = await this.busRepository.findOneBy({ id });

    try {
      if (!bus) {
        throw new BadRequestException('Bus not found');
      }

      let itinerario;
      if (updateBusDto.itinerario) {
        itinerario = await this.itinerarioRepository.findOneBy({
          id: updateBusDto.itinerario,
        });
        if (!itinerario) {
          throw new BadRequestException('Itinerario not found');
        }
      }
      return await this.busRepository.save({
        ...bus,
        ...updateBusDto,
        itinerario,
      });
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async remove(id: number) {
    return await this.busRepository.delete(id);
  }
}
