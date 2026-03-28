import { WorkoutPlan } from './workout-plan.entity';
import { Exercise } from './exercise.entity';
export declare class WorkoutDay {
    id: string;
    dayLabel: string;
    muscleGroup: string;
    workoutPlan: WorkoutPlan;
    exercises: Exercise[];
}
