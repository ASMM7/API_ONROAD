import { CreateReservacionDto } from './dto/create-reservacion.dto';
import { UpdateReservacionDto } from './dto/update-reservacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservacion } from './entities/reservacion.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ReservacionService {
  constructor(
    @InjectRepository(Reservacion)
    private readonly reservacionRepository: Repository<Reservacion>,
  ) {}

  async create(createReservacionDto: CreateReservacionDto): Promise<Reservacion> {
    try {
      const reservacion = this.reservacionRepository.create(createReservacionDto)
      return this.reservacionRepository.save(reservacion);
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async findAll(): Promise<Reservacion[]> {
    return this.reservacionRepository.find({ relations : ['itinerario']});
  }

  async findReservacionById(id: number): Promise<Reservacion> {
    try {
      const reservacion = await this.reservacionRepository.findOne({
        where: { id },
      });
      if (!reservacion) {
        throw new NotFoundException('Reservacion not found');
      }
      return reservacion;
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async update(
    id: number,
    updateReservacionDto: UpdateReservacionDto,
  ): Promise<Reservacion> {
    try {
      const reservacion = await this.findReservacionById(id);
      if (!reservacion) {
        throw new BadRequestException('Reservacion not found');
      }
      return this.reservacionRepository.save({
        ...reservacion,
        ...updateReservacionDto,
      });
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async remove(id: number) {
    try {
      const reservacion = await this.reservacionRepository.delete(id);
      if (!reservacion) {
        throw new BadRequestException('Reservacion not found');
      }
      return reservacion;
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }
}
