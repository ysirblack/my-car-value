import { ExecutionContext , createParamDecorator } from "@nestjs/common";


export const CurrentUser = createParamDecorator(
  //data: never means don't give any data to decarator, it will reject it
  (data: never, context: ExecutionContext) => {
    //coming request includes body, headers, session information etc. inside it
    const request = context.switchToHttp().getRequest(); //we are getting that informations 
    //console.log(request.session.userId); //inside that information, it has the user's session(cookie) that we gave to the user
    //when a user make a request, their cookies included with the request. This is kind of like going a festival. I mean,
    // when you enter the area , their employees require us to wear a bracelet to show them we are approved guests. 
    //when we are inside we do what we have permission to do, but after we exit from it they remove this bracelet and 
    // we will not have any permission to do samethings before. 
    //Here we are checking that user whether has the bracelet before !!While he is making a request

    /* return request.session.userId; V1*/
    return request.currentUser;//V2
    //we got this currentUser information from current-user.interceptor. Decorated paramater will have this returned
    //data, i.e user

})
