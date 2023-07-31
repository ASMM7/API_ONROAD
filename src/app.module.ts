import { Module } from '@nestjs/common';
import { BusesModule } from './buses/buses.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { ItinerarioModule } from './itinerario/itinerario.module';
import { ReservacionModule } from './reservacion/reservacion.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
    
    BusesModule,
    UserModule,
    ItinerarioModule,
    ReservacionModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}