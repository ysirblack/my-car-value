import { MiddlewareConsumer, Module } from '@nestjs/common';
//import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User} from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
//second method to use and interceptor is importing here,//first method was we didn't provided serialize.interceptor here
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, 
 /*    {//globally applied to all controllers
    provide: APP_INTERCEPTOR,
    useClass:CurrentUserInterceptor
  } */ //! after we started to use middleware interceptor we won't need this snippet!
]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes("*");//every single route use this middleware 
    //this behaves like an interceptor but , will intercept before every standart decorator!
    //so, our admin.guard can be work as intended
  }


}
