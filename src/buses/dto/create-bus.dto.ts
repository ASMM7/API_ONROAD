import { IsNotEmpty, IsString , IsInt, Min, Max, IsOptional} from "class-validator";


export class CreateBusDto {

    @IsNotEmpty()
    @IsString()
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
    added_value: string;

    @IsInt()
    @IsOptional()
    itinerario?: number;

}
