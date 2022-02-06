import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass, plainToInstance } from "class-transformer";
//plainToClass is depracted, plainToInstance instead

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}


export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any){}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any>  {
    /*     // Run someting before a request is handled 
    //by the request handler
    console.log("running before the handler:", context);
    */

    return handler.handle().pipe(
      map((data: any)=> {
        /*         //Run something before the response is sent out
        console.log("running before response is sent out",data); */
        return plainToInstance(this.dto,data, {
          excludeExtraneousValues: true,
        })
      })
    )
  }
}