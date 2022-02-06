import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass, plainToInstance } from "class-transformer";
//plainToClass is depracted, use -> plainToInstance instead

interface ClassConstructor {//to set dto type, we need at least a class
  new (...args: any[]): {}//any class is acceptable for our type
}

//for v3 version, this code snippet is more convenient
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}


export class SerializeInterceptor implements NestInterceptor {

  //this constructor added to be more generic, it can be sent here any dto we want
  constructor(private dto: any){}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any>  {
    /*     // Run someting before a request is handled 
    //by the request handler
    console.log("running before the handler:", context);
    *///just here to observe when runs this snippet


    return handler.handle().pipe(
      //* @params data : is the data what it is sent or got from a user, to a user
      map((data: any)=> {
        /*//Run something before the response is sent out
        console.log("running before response is sent out",data); *///just here to observe when runs this snippet

        //sent dto can be used here
        return plainToInstance(this.dto ,data, {
          excludeExtraneousValues: true,
        })
      })
    )
  }
}