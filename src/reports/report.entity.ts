import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";


@Entity()
export class Report {

  @PrimaryGeneratedColumn()
  id:number 


  @Column({default: false})//when a user subimt their reports admin will approve it or reject it
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number
  
  @Column()
  lat: number;

  @Column()
  mileage: number;

  //ManyToOne Decorator will make a change in our database for reports table.
  //typeORM will add user_id column for this. Because reports will have a user id that
  //we tied user and reports with OneToMany and ManyToOne decorators
  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  
}