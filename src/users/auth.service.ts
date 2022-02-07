import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{

  constructor(private usersService: UsersService) {}


  async singup(email: string, password: string) {

    //See if eamil is in use
    const user = await this.usersService.find(email);

    if(user.length){
      throw new BadRequestException("email in use");
    }

    //Hash the users passwords
      // Generate a salt
    const salt = randomBytes(8).toString("hex");
      // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer; //typescript doesn't know what scrypt will return 
      //it marks as unknown, so we have to help ts adding Buffer, because scrypt returns as Buffer

      //Join the hashed result and the salt together
    const result = salt + "." + hash.toString("hex");


    //Create a new user and save it

    // return the user

  }

  signin() {

  }


}