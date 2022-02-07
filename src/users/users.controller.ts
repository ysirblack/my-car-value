import {Session, Controller, Post , Body, Get, Param, Patch, Query, Delete, NotFoundException, UseInterceptors} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
// import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor'; was needed for v1 , not needed anymore
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)//v3 (applies to all controller methods if it is required so)
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService){}


  @Post("/signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any){
    //this.userService.create(body.email, body.password);
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id; //Session object will be in output header
    return user;
  }

  @Post("/signin")
  async signin(@Body() body: CreateUserDto,  @Session() session: any){//name may be inappropriate, but it's logic is appropriate
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id//Session object will be in output header if it is changed
    return user;
  }


  @Get("/whoami")
  whoAmI(@Session() session: any){
    return this.userService.findOne(session.userId);
  }

  @Post("/signout")
  signout(@Session() session: any) {
    session.userId = null;
  }

  

  //@UseInterceptors(new SerializeInterceptor(UserDto)) v1 refactored to V2
  //@Serialize(UserDto)v2 (just for this method)
  @Get("/:id")
  async findUser(@Param("id") id: string){
    //console.log("handler is running"); it is just here to observe when this log will be shown
    const user =  await this.userService.findOne(parseInt(id));
    if(!user){
      throw new NotFoundException("user not found");
    }
    return user;
  }

  //@Serialize(customDto) 
  @Get()
  findAllUsers(@Query("email") email: string){
    return this.userService.find(email);
  }

  //@Serialize(customDto2)
  @Delete("/:id")
  removeUser(@Param("id") id: string){
    return this.userService.remove(parseInt(id));
  }

  //@Serialize(customDto3)
  @Patch("/:id")
  updateuser(@Param("id") id: string , @Body() body: UpdateUserDto){
    return this.userService.update(parseInt(id), body);
  }
}
