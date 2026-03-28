import { Repository } from 'typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';
export declare class WorkoutsService {
    private workoutPlansRepository;
    constructor(workoutPlansRepository: Repository<WorkoutPlan>);
    create(userId: string, createWorkoutDto: CreateWorkoutPlanDto): Promise<WorkoutPlan>;
    findAll(userId: string): Promise<WorkoutPlan[]>;
    remove(id: string, userId: string): Promise<void>;
}
