import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(WorkoutPlan)
    private workoutPlansRepository: Repository<WorkoutPlan>,
  ) {}

  async create(userId: string, createWorkoutDto: any): Promise<WorkoutPlan> {
    const newPlan = this.workoutPlansRepository.create({
      ...createWorkoutDto,
      user: { id: userId },
    } as DeepPartial<WorkoutPlan>);
    return this.workoutPlansRepository.save(newPlan);
  }

  async findAll(userId: string): Promise<WorkoutPlan[]> {
    return this.workoutPlansRepository.find({
      where: { user: { id: userId } },
      relations: ['days', 'days.exercises'],
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const plan = await this.workoutPlansRepository.findOne({ where: { id, user: { id: userId } } });
    if (!plan) throw new NotFoundException('Workout plan not found');
    await this.workoutPlansRepository.remove(plan);
  }
}
