import { Injectable,UnauthorizedException  } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/sevice/user.service';
@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async signIn(email:string, password:string) {
        const user = await this.userService.findOneByEmailAndPassword(email);
        if (!(await bcrypt.compare(password, user?.password ?? ''))) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.name, sub: user.id };
        console.log(payload);
        return {
          access_token: await this.jwtService.signAsync(payload),
        };

      }

}
