import { Itinerario } from 'src/itinerario/entities/itinerario.entity';
import { BadRequestException, NotFoundException,Injectable } from '@nestjs/common';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class ItinerarioService {
  constructor(
    @InjectRepository(Itinerario)
    private readonly itinerarioRepository: Repository<Itinerario>,
  ){}

  async create(createItinerarioDto: CreateItinerarioDto):Promise<Itinerario> {

    const { origin_city, destination_city, departure_date, arrival_date,price} =createItinerarioDto;
    const itinerario = new Itinerario();
    itinerario.origin_city = origin_city;
    itinerario.destination_city = destination_city;
    itinerario.departure_date = departure_date;
    itinerario.arrival_date= arrival_date;
    itinerario.price = price;
    return this.itinerarioRepository.save(itinerario);
  }
  

  async findAll(): Promise<Itinerario[]> {
    return this.itinerarioRepository.find();
  }

  async findItinerarioById(id: number): Promise<Itinerario> {
    const itinerario = await this.itinerarioRepository.findOne({where:{id}});
    if(!itinerario){
      throw new NotFoundException('El itinerario no found');
    
    }
    return itinerario;
  }

  /*async update(id: number, updateItinerarioDto: UpdateItinerarioDto){
    const Itinerario = await this.itinerarioRepository.findOneBy({id});

    if(!Itinerario){
      throw new BadRequestException('El itinerario no found');
    
  }

  let bus;
  if(updateItinerarioDto.bus){
    bus = await this.busRepository.findOneBy({
      id: updateItinerarioDto.bus,
    });

    if(!bus){
      throw new BadRequestException('El bus no found');
    }
  }

    return await this.itinerarioRepository.save({
      ...Itinerario,
      ...updateItinerarioDto,
      bus,
    });
}*/



      async update(id: number, updateItinerarioDto: UpdateItinerarioDto) {
      const itinerario = await this.itinerarioRepository.findOneBy({id});
      if(!itinerario){
        throw new BadRequestException('El itinerario no found');
      }
      return  this.itinerarioRepository.save({...itinerario, ...updateItinerarioDto});

    }

    async remove(id: number) {
      const itinerario = await this.itinerarioRepository.delete(id);
      if (!itinerario) {
        throw new BadRequestException('El itinerario no found');
      }
      return itinerario;
     
    }

}