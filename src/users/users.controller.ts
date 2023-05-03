import { Body, Controller, Post, Get, Param, Req, Res, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/users.create-user.dto'
import { UserService } from './sevice/user.service';
import User from './entity/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('유저 API')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UserService) { }

    @Get()
    findAll():Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param() id:number) : Promise<User>{
        return this.userService.findOne(id);
    }

    @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
    @ApiCreatedResponse({ description: '유저를 생성한다.', type: CreateUserDto })
    @Post()
    createUser(@Body() user:CreateUserDto){
        return this.userService.create(user);
    }

    @Delete(':id')
    removeOne(@Param() id:number) : Promise<void>{
        return this.userService.delete(id);
    }

    @Put(':id')
    updateOne(@Param() id:number, @Body() user: CreateUserDto){
        return this.userService.update(id,user);
    }

}