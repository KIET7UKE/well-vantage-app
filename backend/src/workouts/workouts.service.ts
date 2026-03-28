import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(WorkoutPlan)
    private workoutPlansRepository: Repository<WorkoutPlan>,
  ) {}

  /**
   * Creates a new workout plan with days and exercises.
   * @param userId The ID of the creator.
   * @param createWorkoutDto The workout plan structure.
   * @returns The saved workout plan with its relations.
   */
  async create(userId: string, createWorkoutDto: CreateWorkoutPlanDto): Promise<WorkoutPlan> {
    const newPlan = this.workoutPlansRepository.create({
      ...createWorkoutDto,
      user: { id: userId },
    } as DeepPartial<WorkoutPlan>);
    return this.workoutPlansRepository.save(newPlan);
  }

  /**
   * Finds all workout plans for a specific user, including full nested details.
   * @param userId The ID of the owner.
   * @returns Array of workout plans with days and exercises.
   */
  async findAll(userId: string): Promise<WorkoutPlan[]> {
    return this.workoutPlansRepository.find({
      where: { user: { id: userId } },
      relations: ['days', 'days.exercises'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Deletes a specific workout plan. Cascades to days and exercises.
   * @param id The ID of the plan.
   * @param userId The ID of the user performing the deletion.
   */
  async remove(id: string, userId: string): Promise<void> {
    const plan = await this.workoutPlansRepository.findOne({ where: { id, user: { id: userId } } });
    if (!plan) throw new NotFoundException('Workout plan not found');
    await this.workoutPlansRepository.remove(plan);
  }
}

