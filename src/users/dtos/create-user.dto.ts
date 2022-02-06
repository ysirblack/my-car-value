import { IsString,IsEmail } from "class-validator";
//DTO's like filter , they filter the unwanted ones. I set what I want from a user.
//Use this DTO's in CONTROLLERS!

export class CreateUserDto {

  @IsEmail()//!not isEmail !!! => IsEmail
  email: string;

  @IsString()
  password: string;

  
}