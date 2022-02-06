import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(//for DTOs
    new ValidationPipe({
      whitelist: true,//for a security reason, users can't submit
      //another key value other than we set, like email and password.We just
      //want these two.
    }),
  );

  await app.listen(3000);
}
bootstrap();
