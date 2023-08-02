import { IsNotEmpty, IsString , IsInt, Min, Max, IsOptional} from "class-validator";
import { Unique } from "typeorm";


export class CreateBusDto {

    @IsNotEmpty()
    @IsString()
    @Unique(['plateNumber'])
    plateNumber: string;
    
    @IsNotEmpty()
    @IsString()
    operator: string;

    @IsNotEmpty()
    @IsInt()
    @Min(20)
    @Max(35)
    seatCapacity: number;

    @IsNotEmpty()    
    @IsString()
    type_seat: string;
       
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    added_value?: string;

    @IsInt()
    @IsOptional()
    itinerario?: number;

}
