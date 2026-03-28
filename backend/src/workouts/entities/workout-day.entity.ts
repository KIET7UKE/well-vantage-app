import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { Exercise } from './exercise.entity';

@Entity('workout_days')
export class WorkoutDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dayLabel: string;

  @Column()
  muscleGroup: string;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.days, { onDelete: 'CASCADE' })
  workoutPlan: WorkoutPlan;

  @OneToMany(() => Exercise, (exercise) => exercise.workoutDay, { cascade: true })
  exercises: Exercise[];
}
