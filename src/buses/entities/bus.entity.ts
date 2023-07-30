import {
  Column,DeleteDateColumn,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from "typeorm";

  import { Itinerario } from "src/itinerario/entities/itinerario.entity";

@Entity()
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @Column()
  operator: string;

  @Column()
  seatCapacity: number;

  @Column()
  type_seat: string;

  @Column()
  added_value: string;

  @ManyToOne(()=> Itinerario, itinerario => itinerario.id,{
    eager: true,
  })
  itinerario: Itinerario;
    
  @DeleteDateColumn()
  deletedAt: Date;

}