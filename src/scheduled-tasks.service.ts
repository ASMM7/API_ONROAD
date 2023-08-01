import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class ScheduledTasksService {
  @Cron('0 */5 * * * * *') 
  updateSchedules() {
    console.log('Actualizando horarios de autobuses en 5 min');
  }

  @Interval(60000) 
  processReservations() {
    console.log('Procesando reservas de usuarios en 1 min');
  }

  @Timeout(300000)
  updateSeatAvailability() {
    console.log('Actualizando disponibilidad de asientos 5 min');
  }

  @Cron('0 0 2 * * *') //2 AM
  cleanUpOldData() {
    console.log('Limpiando datos de reservas antiguas por las noches ');
  }
}