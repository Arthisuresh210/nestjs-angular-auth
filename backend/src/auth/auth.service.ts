import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly ALLOWED_DOMAIN = 'c1exchange.com';

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const email: string = user.email;
    const domain = email.split('@')[1];

    if (domain !== this.ALLOWED_DOMAIN) {
      throw new UnauthorizedException('ACCESS_DENIED');
    }

    const payload = { sub: Number(user.id), email: user.email };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '24h' }),
      user: {
        id: Number(user.id),
        email: user.email,
        name: user.name,
        picture: user.picture,
        google_id: user.google_id,
      },
    };
  }

  async googleLogin(user: any) {
    return this.login(user);
  }
}