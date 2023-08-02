import { Itinerario } from "src/itinerario/entities/itinerario.entity";
import {
    Column,DeleteDateColumn,Entity,JoinColumn,ManyToOne,OneToOne,PrimaryGeneratedColumn} from "typeorm";
  
//import { User } from "src/user/entities/user.entity";
import { UsuarioEntity } from "src/users/entities/user.entity";

@Entity()
export class Reservacion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seat_number: number;

    @OneToOne(()=> UsuarioEntity, (user)=> user.id,{ eager: true })
    @JoinColumn()
    user: UsuarioEntity;
    
    @ManyToOne(() => Itinerario, itinerario => itinerario.id,{
        eager: true,
    })

    itinerario: Itinerario;

    @DeleteDateColumn()
    deletedAt: Date;
    
    
}
