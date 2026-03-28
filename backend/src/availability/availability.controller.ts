import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@UseGuards(JwtAuthGuard)
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  /**
   * Creates multiple availability slots for the authenticated user.
   * @param req The request object containing user information.
   * @param createAvailabilityDtos Array of availability slot details.
   * @returns The created availability slots.
   */
  @Post()
  create(@Request() req: any, @Body() createAvailabilityDtos: CreateAvailabilityDto[]) {
    return this.availabilityService.createMany(req.user.id, createAvailabilityDtos);
  }

  /**
   * Retrieves all availability slots for the authenticated user.
   * @param req The request object containing user information.
   * @returns List of availability slots.
   */
  @Get()
  findAll(@Request() req: any) {
    return this.availabilityService.findAll(req.user.id);
  }

  /**
   * Removes a specific availability slot.
   * @param req The request object containing user information.
   * @param id The ID of the slot to remove.
   */
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.availabilityService.remove(id, req.user.id);
  }
}
