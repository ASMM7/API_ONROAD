import { Itinerario } from "src/itinerario/entities/itinerario.entity";
import {
    Column,DeleteDateColumn,Entity,JoinColumn,ManyToOne,OneToOne,PrimaryGeneratedColumn} from "typeorm";
  
import { UsuarioEntity } from "src/users/entities/user.entity";

@Entity()
export class Reservacion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seat_number: number;


    @OneToOne(()=> UsuarioEntity, (user)=> user.id,{ eager: true })
    @JoinColumn({ name : 'usuario_id'})
    user: UsuarioEntity;
    
    @ManyToOne(() => Itinerario, itinerario => itinerario.id,{
        eager: true,
    })
    @JoinColumn({name : 'itinerario_id'})

    itinerario: Itinerario;

    @DeleteDateColumn()
    deletedAt: Date;
    
    
}
