import {  HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/users.create-user.dto";
import User from "../entity/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll() : Promise<User[]>{
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOneById(id);
    }

    async findOneByEmailAndPassword(email:string){
       return this.userRepository.findOne({
            where : {
                email : email,
            }
        })
    }


    async create(user:CreateUserDto){
        const isUser = await this.userRepository.findOne({ 
            where: { 
              email: user.email
            } 
        });
        
        if(isUser){
            throw new HttpException(
                '이미 있는 유저 이메일입니다.',
                HttpStatus.NOT_FOUND,
              );
        }
        
        const saveUser = await this.transformPassword(user);
        await this.userRepository.save(saveUser);

    }

    async transformPassword(user:CreateUserDto):Promise<CreateUserDto>{
        const saveUser = {...user, password : await bcrypt.hash(
            user.password, 10
        )}
        return saveUser;
    }


    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ 
            where: { 
              email: email
            } 
        });
        
        if (user) {
          return user;
        }

        throw new HttpException(
          '사용자 이메일이 존재하지 않습니다.',
          HttpStatus.NOT_FOUND,
        );
    }

    async update(id:number,user:CreateUserDto){
        const prevUser = await this.userRepository.findOneById(id);
        let userToUpdate = {...prevUser,...user};
        await this.userRepository.save(userToUpdate);
    }

    async delete(id:number):Promise<void>{
        await this.userRepository.delete(id);
    }

}