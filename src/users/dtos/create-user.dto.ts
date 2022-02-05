import { IsString,IsEmail } from "class-validator";


export class CreateUserDto {

  @IsEmail()//!not isEmail !!! => IsEmail
  email: string;

  @IsString()
  password: string;

  
}