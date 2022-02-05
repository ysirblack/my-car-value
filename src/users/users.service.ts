import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User> ){ }

  create(email: string, password: string ){
    const user = this.repo.create({email, password});
    return this.repo.save(user);
  }

  findOne(id:number){
    return this.repo.findOne(id)
  }

  find(email:string){
    return this.repo.find({email});
  }

  // Partial<User>  ya email i ya da passwordu yada ikisinide update etmek
  //istersek bu gösterim sorunu çözüyor(User entity için)
  async update(id: number, attrs: Partial<User> ){
    const user = await this.findOne(id);
    if(!user){
      throw new Error("user not found");
    }
    Object.assign(user,attrs);
    return this.repo.save(user);
  }

  //remove for Entiteis , delete for ids
  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new Error("already removed!!");
    }
    return this.repo.remove(user);
  }

}
