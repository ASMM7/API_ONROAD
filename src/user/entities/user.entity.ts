import {
    Column,DeleteDateColumn,Entity,OneToOne,PrimaryGeneratedColumn} from "typeorm";

import{ RolUser} from 'src/user/enum/rol_user'
import { Reservacion } from "src/reservacion/entities/reservacion.entity";
    
@Entity()
export class User {

   @PrimaryGeneratedColumn()
   id: number;
   
   @Column({length: 30})
   username: string;

   @Column({ nullable: false})
   password: string;
   
   @Column({default: "user"})
   role: RolUser;

   @OneToOne(() => Reservacion, (reservacion) => reservacion.user)
   
   reservacion: Reservacion;

   @DeleteDateColumn()
   deletedAt: Date;
}