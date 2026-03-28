import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Request() req: any, @Body() createWorkoutDto: any) {
    return this.workoutsService.create(req.user.id, createWorkoutDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.workoutsService.findAll(req.user.id);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.workoutsService.remove(id, req.user.id);
  }
}
