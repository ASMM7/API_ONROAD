import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItinerarioService } from './itinerario.service';
import { CreateItinerarioDto } from './dto/create-itinerario.dto';
import { UpdateItinerarioDto } from './dto/update-itinerario.dto';


@Controller('itinerario')
export class ItinerarioController {
  constructor(private readonly itinerarioService: ItinerarioService) {}

  @Post()
  create(@Body() createItinerarioDto: CreateItinerarioDto) {
    return this.itinerarioService.create(createItinerarioDto);
  }

  @Get()
  findAll() {
    return this.itinerarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itinerarioService.findItinerarioById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateItinerarioDto: UpdateItinerarioDto) {
    return this.itinerarioService.update(id, updateItinerarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itinerarioService.remove(id);
  }
}
