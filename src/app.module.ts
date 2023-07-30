import { Module } from '@nestjs/common';
import { BusesModule } from './buses/buses.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { ItinerarioModule } from './itinerario/itinerario.module';
import { ReservacionModule } from './reservacion/reservacion.module';

@Module({
  imports: [
    BusesModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "user_crud",
      password: "root",
      database: "db_crud",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ItinerarioModule,
    ReservacionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}