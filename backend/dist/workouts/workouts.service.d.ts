import { Repository } from 'typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';
export declare class WorkoutsService {
    private workoutPlansRepository;
    constructor(workoutPlansRepository: Repository<WorkoutPlan>);
    create(userId: string, createWorkoutDto: any): Promise<WorkoutPlan>;
    findAll(userId: string): Promise<WorkoutPlan[]>;
    remove(id: string, userId: string): Promise<void>;
}
