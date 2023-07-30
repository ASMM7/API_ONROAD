import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { Bus } from './entities/bus.entity';
import { ItinerarioModule } from 'src/itinerario/itinerario.module';
import { ItinerarioService } from 'src/itinerario/itinerario.service';



@Module({
  imports:[TypeOrmModule.forFeature([Bus]),ItinerarioModule],
  controllers: [BusesController],
  providers: [BusesService, ItinerarioService],
  exports:[],
})
export class BusesModule {}
