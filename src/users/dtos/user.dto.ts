import { Expose } from "class-transformer";
import { IsString } from "class-validator";
//Expose share this property
//Exclude don't share this property


export class UserDto {
  
  @Expose()
  id: number;

  @Expose()
  email: string;


}