import { Column, DeleteDateColumn, Entity} from "typeorm";
import { RolUser } from "../const/rol_users";


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
    
    @DeleteDateColumn()
    deleteAt: Date;

}
