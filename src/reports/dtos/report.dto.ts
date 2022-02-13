import {  Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";


export class ReportDto {

  @Expose()
  id: number
  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  ltd: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  //take the original report entity and get its user property and id
  //assing it to the (newly created here) userId
  @Transform(({ obj } )=>  obj.user.id  )
  @Expose()
  userId: number;


}