import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private googleClient;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    mockGoogleLogin(email: string, name: string): Promise<{
        success: boolean;
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    googleLogin(idToken: string): Promise<{
        success: boolean;
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            picture: string;
        };
    }>;
}
