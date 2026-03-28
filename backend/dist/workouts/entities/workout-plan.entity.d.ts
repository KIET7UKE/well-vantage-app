import { User } from '../../users/entities/user.entity';
import { WorkoutDay } from './workout-day.entity';
export declare class WorkoutPlan {
    id: string;
    name: string;
    notes: string;
    user: User;
    days: WorkoutDay[];
    createdAt: Date;
}
