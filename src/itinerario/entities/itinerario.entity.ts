
import { Bus } from "src/buses/entities/bus.entity";
import { Reservacion } from "src/reservacion/entities/reservacion.entity";
import {
    Column,DeleteDateColumn,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn} from "typeorm";
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

   
    @ManyToOne(() => Bus, bus => bus.itinerario)  
    @JoinColumn({ name: 'bus_id' })
    buss: Bus;
    

    @DeleteDateColumn()
    deletedAt: Date;
}
