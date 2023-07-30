import { Module } from '@nestjs/common';
import { ReservacionService } from './reservacion.service';
import { ReservacionController } from './reservacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './entities/reservacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservacion])],
  controllers: [ReservacionController],
  providers: [ReservacionService]
})
export class ReservacionModule {}
