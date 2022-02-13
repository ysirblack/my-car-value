//added "setFilesAfterEnv": ["<rootDir>/setup.ts"] this to jest-e2e.json file 
//to execute this global before each!
//we are gonna delete test.sqlite file before making our tests .

import { rm} from "fs/promises";
import {join } from "path";
import {getConnection} from "typeorm";


global.beforeEach(async ()=>{
  try{
    await rm(join(__dirname,"..","test.sqlite"));
  }
  catch(err){}//if you cannot find the test.sqlite it is okay that's the purpose don't do anything!
});
 
//after everytest
global.afterEach(async ()=>{
  const conn = getConnection();//get typeorm conenction
  await conn.close();//close it, don't stay conencted
});