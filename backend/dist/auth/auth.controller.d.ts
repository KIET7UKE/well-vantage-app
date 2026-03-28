import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    mockGoogleLogin(body: {
        email: string;
        name: string;
    }): Promise<{
        success: boolean;
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    googleLogin(body: {
        idToken: string;
    }): Promise<{
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
