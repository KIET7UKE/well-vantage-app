import { User } from '../../users/entities/user.entity';
export declare class Availability {
    id: string;
    user: User;
    date: string;
    startTime: string;
    endTime: string;
    sessionName: string;
}
