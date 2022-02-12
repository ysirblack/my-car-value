import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session'); //doesn't work with import

//Much more easy way to test e2e. In e2e test we need main.ts part but e2e testin starts with app module and
//continues testing hieararchyly downward , however, in main.ts we have setups like cookieSession and pipes
//so if we just call this function and give app instance to this as a parameter, we can use this in main.ts and
//also in out e2e test file.

export const setupApp = (app: any) => {
  app.use(
    cookieSession({
      keys: ['asdasdasd'], //set whatever you want, it will be used in the cookie for encryption
    }),
  );
  app.useGlobalPipes(
    //for DTOs
    new ValidationPipe({
      whitelist: true, //for a security reason, users can't submit
      //another key value other than we set, like email and password.We just
      //want these two.
    }),
  );
};
