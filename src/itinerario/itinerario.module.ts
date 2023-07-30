import { Module } from '@nestjs/common';
import { ItinerarioService } from './itinerario.service';
import { ItinerarioController } from './itinerario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { Itinerario } from './entities/itinerario.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Itinerario])],
  controllers: [ItinerarioController],
  providers: [ItinerarioService],
  exports:[TypeOrmModule],
})
export class ItinerarioModule {}
