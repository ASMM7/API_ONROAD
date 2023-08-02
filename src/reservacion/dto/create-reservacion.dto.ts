import { IsInt, IsNotEmpty, Min} from "class-validator";
import { Unique } from "typeorm";

export class CreateReservacionDto {
    
    @Unique(['seat_number'])
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    seat_number: number;

   

}
