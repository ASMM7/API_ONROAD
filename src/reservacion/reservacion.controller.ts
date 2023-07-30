import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservacionService } from './reservacion.service';
import { CreateReservacionDto } from './dto/create-reservacion.dto';
import { UpdateReservacionDto } from './dto/update-reservacion.dto';

@Controller('reservacion')
export class ReservacionController {
  constructor(private readonly reservacionService: ReservacionService) {}

  @Post()
  create(@Body() createReservacionDto: CreateReservacionDto) {
    return this.reservacionService.create(createReservacionDto);
  }

  @Get()
  findAll() {
    return this.reservacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reservacionService.findReservacionById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReservacionDto: UpdateReservacionDto) {
    return this.reservacionService.update(id, updateReservacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reservacionService.remove(id);
  }
}
