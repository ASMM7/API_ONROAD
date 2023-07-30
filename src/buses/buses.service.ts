import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { Bus } from './entities/bus.entity';
import {InjectRepository} from '@nestjs/typeorm'
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
    
    
    const itinerario = await this.itinerarioRepository.findOneBy({
      id: createBusDto.itinerario,
    });

    if (!itinerario) {
      throw new BadRequestException('Itinerario not found');
    }
    
    const bus = this.busRepository.create({
      plateNumber : createBusDto.plateNumber,
      operator : createBusDto.operator,
      seatCapacity : createBusDto.seatCapacity,
      type_seat : createBusDto.type_seat,
      added_value : createBusDto.added_value,
      itinerario,
    });
    return await this.busRepository.save(bus);
  }


  async findAll(): Promise<Bus[]> {
    return this.busRepository.find();
  }
 
  async findBusById(id: number): Promise<Bus> {
    const bus = await this.busRepository.findOne({where: {id}});
    if (!bus) {
      throw new NotFoundException('Bus not found');
    }
    return bus;
  }
  

  async update(id: number, updateBusDto: UpdateBusDto): Promise<Bus> {
    const bus = await this.busRepository.findOneBy({id});

    if (!bus) {
      throw new BadRequestException('Bus not found');
    }

    let itinerario;
    if(updateBusDto.itinerario){
      itinerario = await this.itinerarioRepository.findOneBy({
        id: updateBusDto.itinerario,
      });
      if(!itinerario){
        throw new BadRequestException('Itinerario not found');
      
      }
    }
    return await this.busRepository.save({
      ...bus,
      ...updateBusDto,
      itinerario,
    });
  }
  


  async remove(id: number) {
    return await this.busRepository.delete(id);
   
  }
}


