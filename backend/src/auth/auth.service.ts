/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateLocalUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password)
      throw new UnauthorizedException('Invalid credentials');
    const valid = await this.usersService.validatePassword(
      password,
      user.password,
    );
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    };
  }

  async register(email: string, password: string, name: string) {
    const exists = await this.usersService.findByEmail(email);
    if (exists) throw new ConflictException('Email already in use');
    const user = await this.usersService.createLocalUser(email, password, name);
    return this.login(user);
  }

  async googleLogin(user: any) {
    return this.login(user);
  }
}
