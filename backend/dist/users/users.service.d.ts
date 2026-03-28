import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOrCreateUser(email: string, name: string, googleId: string, picture?: string): Promise<User>;
    findById(id: string): Promise<User | null>;
}
