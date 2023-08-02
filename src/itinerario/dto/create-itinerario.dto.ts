import { IsNotEmpty,IsString , IsInt, IsDate, Min, Max,IsOptional} from "class-validator";
import { Type } from 'class-transformer';
export class CreateItinerarioDto {

    @IsNotEmpty()
    @IsString()
    origin_city: string;

    @IsNotEmpty()
    @IsString()
    destination_city: string;
    
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    departure_date: Date;


    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    arrival_date: Date;


    @IsNotEmpty()
    @IsInt()
    @Min(30)
    @Max(100)
    price: number;

  

}
