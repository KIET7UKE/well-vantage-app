import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/mock')
  async mockGoogleLogin(@Body() body: { email: string; name: string }) {
    return this.authService.mockGoogleLogin(body.email, body.name);
  }

  @Post('google')
  async googleLogin(@Body() body: { idToken: string }) {
    return this.authService.googleLogin(body.idToken);
  }
}
