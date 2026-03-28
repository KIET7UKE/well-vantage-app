import { WorkoutsService } from './workouts.service';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    create(req: any, createWorkoutDto: any): Promise<import("./entities/workout-plan.entity").WorkoutPlan>;
    findAll(req: any): Promise<import("./entities/workout-plan.entity").WorkoutPlan[]>;
    remove(req: any, id: string): Promise<void>;
}
