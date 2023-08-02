import { Column, DeleteDateColumn, Entity, OneToOne} from "typeorm";
import { RolUser } from "../const/rol_users";
import { Reservacion } from "src/reservacion/entities/reservacion.entity";
@Entity()
export class UsuarioEntity {
    
    @Column({primary: true, generated :true})
    id: number;
    
    @Column({length: 50})
    name: string;
    
    @Column({ unique:true, nullable:false})
    email: string;
    
    @Column({nullable:false})
    password: string;

    @Column({default:"User"})
    rol: RolUser;


    @OneToOne(() =>Reservacion, (reservacion) => reservacion.user)
   
   reservacion: Reservacion;
    
    @DeleteDateColumn()
    deleteAt: Date;

}
