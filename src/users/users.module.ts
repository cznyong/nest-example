import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import User from './entity/user.entity';
import { UsersController } from './users.controller';
import { UserService } from './sevice/user.service';
@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UsersController],
    providers :[UserService],
    exports: [UserService],
})
export class UsersModule {}
