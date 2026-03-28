import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sets: string;

  @IsString()
  @IsNotEmpty()
  reps: string;
}

export class WorkoutDayDto {
  @IsString()
  @IsNotEmpty()
  dayLabel: string;

  @IsString()
  @IsNotEmpty()
  muscleGroup: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  exercises: ExerciseDto[];
}

export class CreateWorkoutPlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutDayDto)
  days: WorkoutDayDto[];
}
