import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {setupApp} from "../src/setup-app";

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //we could call our setupApp here for easy way, but to implement nestjs suggestion, we will 
    //use another method. However, it is not mandatory to follow nest suggestions. 
    //todo setupApp(app); //more convenient way for our current application,but for education purpoeses nestjs implemantation will be used.

    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'asdlkjq432@akl.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'alskdfjl' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});
