import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post,HttpCode,HttpStatus,Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/users.create-user.dto';
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() request: CreateUserDto) {
      return this.authService.signIn(request.email, request.password);
    }

}
