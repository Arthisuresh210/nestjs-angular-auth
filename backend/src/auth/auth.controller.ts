import { Controller, Get, UseGuards, Request, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Request() req, @Res() res: Response) {
    const frontendUrl = this.config.get('FRONTEND_URL');
    try {
      const result = await this.authService.googleLogin(req.user);
      res.redirect(`${frontendUrl}/auth/callback?token=${result.access_token}`);
    } catch (error: any) {
      if (error.message === 'ACCESS_DENIED') {
        res.redirect(`${frontendUrl}/access-denied`);
      } else {
        res.redirect(`${frontendUrl}/login`);
      }
    }
  }
}
