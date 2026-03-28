import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Mocks a Google login for development purposes.
   * @param body Contains user's email and name.
   * @returns JWT token and user details.
   */
  @Post('google/mock')
  async mockGoogleLogin(@Body() body: { email: string; name: string }) {
    return this.authService.mockGoogleLogin(body.email, body.name);
  }

  /**
   * authenticates a user using a Google ID Token.
   * @param body Contains the ID Token from Google Sign-In.
   * @returns JWT token and user details.
   */
  @Post('google')
  async googleLogin(@Body() body: { idToken: string }) {
    return this.authService.googleLogin(body.idToken);
  }
}

