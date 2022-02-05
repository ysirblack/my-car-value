import { Controller, Post , Body, Get, Param, Patch, Query, Delete, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService){}


  @Post("/signup")
  createUser(@Body() body: CreateUserDto){
    this.userService.create(body.email, body.password);
  }

  @Get("/:id")
  async findUser(@Param("id") id: string){
    const user =  await this.userService.findOne(parseInt(id));
    if(!user){
      throw new NotFoundException("user not found");
    }
    return user;
  }

  @Get()
  findAllUsers(@Query("email") email: string){
    return this.userService.find(email);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string){
    return this.userService.remove(parseInt(id));
  }

  @Patch("/:id")
  updateuser(@Param("id") id: string , @Body() body: UpdateUserDto){
    return this.userService.update(parseInt(id), body);
  }
}
