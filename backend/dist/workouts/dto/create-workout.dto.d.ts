export declare class ExerciseDto {
    name: string;
    sets: string;
    reps: string;
}
export declare class WorkoutDayDto {
    dayLabel: string;
    muscleGroup: string;
    exercises: ExerciseDto[];
}
export declare class CreateWorkoutPlanDto {
    name: string;
    notes?: string;
    days: WorkoutDayDto[];
}
