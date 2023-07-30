
import { Bus } from "src/buses/entities/bus.entity";
import { Reservacion } from "src/reservacion/entities/reservacion.entity";
import {
    Column,DeleteDateColumn,Entity,OneToMany,PrimaryGeneratedColumn} from "typeorm";
@Entity()  
export class Itinerario {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    origin_city:string;

    @Column()
    destination_city:string;

    @Column()
    departure_date:Date;

    @Column()
    arrival_date:Date;  

    @Column()
    price:number;
    
    @OneToMany(()=> Reservacion, reservacion => reservacion.itinerario)
    reservacion: Reservacion[];

   
    @OneToMany(() => Bus, bus => bus.itinerario)  
    buses: Bus[];
    

    @DeleteDateColumn()
    deletedAt: Date;
}
