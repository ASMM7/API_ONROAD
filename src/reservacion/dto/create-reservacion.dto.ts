import { IsEmpty, IsInt, Min} from "class-validator";

export class CreateReservacionDto {

    @IsInt()
    @Min(1)
    seat_number: number;

   

}
