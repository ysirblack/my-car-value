import { IsString, IsOptional, IsEmail } from "class-validator";
//DTO's like filter , they filter the unwanted ones. I set what I want from a user.
//Use this DTO's in CONTROLLERS!

export class UpdateUserDto{

  //Shoul be like email format
  //and cannot be provided from a user. i.e can be empty field.
  @IsEmail()
  @IsOptional()
  email: string


  
  @IsString()
  @IsOptional()
  password: string


}