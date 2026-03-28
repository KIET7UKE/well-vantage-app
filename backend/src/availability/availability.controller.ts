import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Request() req: any, @Body() createAvailabilityDtos: any[]) {
    // Expecting array because user can "repeat sessions" resulting in multiple dates
    return this.availabilityService.createMany(req.user.id, createAvailabilityDtos);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.availabilityService.findAll(req.user.id);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.availabilityService.remove(id, req.user.id);
  }
}
