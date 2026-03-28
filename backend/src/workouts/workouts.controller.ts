import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';
import { WorkoutPlan } from './entities/workout-plan.entity';

@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  /**
   * Creates a new workout plan for the authenticated user.
   * @param req The request object containing user information.
   * @param createWorkoutDto Details of the workout plan to create.
   * @returns The created workout plan entity.
   */
  @Post()
  create(@Request() req: any, @Body() createWorkoutDto: CreateWorkoutPlanDto): Promise<WorkoutPlan> {
    return this.workoutsService.create(req.user.id, createWorkoutDto);
  }

  /**
   * Retrieves all workout plans for the authenticated user.
   * @param req The request object containing user information.
   * @returns List of workout entities with nested details.
   */
  @Get()
  findAll(@Request() req: any): Promise<WorkoutPlan[]> {
    return this.workoutsService.findAll(req.user.id);
  }

  /**
   * Deletes a specific workout plan.
   * @param req The request object containing user information.
   * @param id The ID of the workout plan to delete.
   */
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string): Promise<void> {
    return this.workoutsService.remove(id, req.user.id);
  }
}

