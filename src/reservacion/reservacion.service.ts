
import { CreateReservacionDto } from './dto/create-reservacion.dto';
import { UpdateReservacionDto } from './dto/update-reservacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Reservacion } from './entities/reservacion.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';


export class ReservacionService {
  constructor(
    @InjectRepository(Reservacion)
    private readonly reservacionRepository: Repository<Reservacion>,
  ){}


  async create(createReservacionDto: CreateReservacionDto): Promise<Reservacion> {
    const{seat_number} = createReservacionDto;
    const reservacion = new Reservacion();
    reservacion.seat_number = seat_number;
    return this.reservacionRepository.save(reservacion);
    
  }

  async findAll(): Promise<Reservacion[]> {
    return this.reservacionRepository.find() ;
  }

  async findReservacionById(id: number): Promise<Reservacion> {
    const reservacion = await this.reservacionRepository.findOne({where:{id}});
    if(!reservacion){
      throw new NotFoundException('Reservacion not found');
    }
    return reservacion;
  }

  async update(id: number, updateReservacionDto: UpdateReservacionDto): Promise<Reservacion> {
   const reservacion = await this.findReservacionById(id);
   if(!reservacion){
     throw new BadRequestException('Reservacion not found');
   }
   return this.reservacionRepository.save({...reservacion, ...updateReservacionDto});
  }

  async remove(id: number) {
    const reservacion = await this.reservacionRepository.delete(id);
    if(!reservacion){
      throw new BadRequestException('Reservacion not found');
    }
    return reservacion;
 }
}