import { IsNumber, IsString, Max, Min, IsLatitude, IsLongitude } from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimateDto {

  @IsString()
  make: string

  @IsString()
  model:string;
  
  //when making a query , data will come as a string, so we need to parse it 
  @Transform(( { value } )=> parseInt(value))//value is year
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(( { value } )=> parseInt(value))//value is mileage
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform(( { value } )=> parseFloat(value))//value is lng
  @IsLongitude()
  lng: number;

  @Transform(( { value } )=> parseFloat(value))//value is lat
  @IsLatitude()
  lat: number


}