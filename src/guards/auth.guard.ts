import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";


export class AuthGuard implements CanActivate{
  canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();

    return request.session.userId; //if this is null, our guard will not let the decoreted function run
    //it means if I sign out , I will not have a null userId cooike that we included, 
  }

}