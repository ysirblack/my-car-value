import { NestInterceptor, ExecutionContext , CallHandler , Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";


//this class made for authentication purposes. This will help current-user.decorator file. 
//When a user make his request, this request will be pass through our controllers, when this happens ,
//we are getting their session(cookie) information that we gave, via their userId(becuase we save them to our databes unique userIds)
//using dependecy injection we use UsersService to find that user with that id and then we are attaching found user to
//request. because request is pointed to executioncontext, we will be able to have kind of get user in decorator
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

  constructor(private usersService : UsersService){}

  async intercept(context: ExecutionContext, handler: CallHandler) {

    //If you put your logic before returnin the handler.handle, interceptor, intercept while request incoming,
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if(userId){
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();//run the actual handler(means, controllers handler, keep going what you do)
      //but if you put your logic in return seciton, interceptor , intercept while just before returning our 
      //response!
  }
}