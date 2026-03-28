import { WorkoutsService } from './workouts.service';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';
import { WorkoutPlan } from './entities/workout-plan.entity';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    create(req: any, createWorkoutDto: CreateWorkoutPlanDto): Promise<WorkoutPlan>;
    findAll(req: any): Promise<WorkoutPlan[]>;
    remove(req: any, id: string): Promise<void>;
}
