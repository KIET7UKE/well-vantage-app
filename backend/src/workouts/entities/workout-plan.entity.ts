import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { WorkoutDay } from './workout-day.entity';

@Entity('workout_plans')
export class WorkoutPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => WorkoutDay, (day) => day.workoutPlan, { cascade: true })
  days: WorkoutDay[];

  @CreateDateColumn()
  createdAt: Date;
}
