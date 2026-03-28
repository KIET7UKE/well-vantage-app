import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WorkoutDay } from './workout-day.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sets: string;

  @Column()
  reps: string;

  @ManyToOne(() => WorkoutDay, (day) => day.exercises, { onDelete: 'CASCADE' })
  workoutDay: WorkoutDay;
}
