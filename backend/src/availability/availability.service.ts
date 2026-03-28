import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  /**
   * Creates and saves several availability slots for a specific user.
   * Checks for duplicates within the request and in the database.
   * @param userId The ID of the user creating the slots.
   * @param createAvailabilityDtos Array of availability slot details.
   * @returns A promise resolving to an array of saved Availability entities.
   * @throws ConflictException if a duplicate slot is found.
   */
  async createMany(userId: string, createAvailabilityDtos: CreateAvailabilityDto[]): Promise<Availability[]> {
    // 1. Check for duplicates within the batch
    const seenSlots = new Set<string>();
    for (const dto of createAvailabilityDtos) {
      const slotKey = `${dto.date}|${dto.startTime}|${dto.endTime}`;
      if (seenSlots.has(slotKey)) {
        throw new ConflictException(`Duplicate slot in request: ${dto.date} ${dto.startTime}-${dto.endTime}`);
      }
      seenSlots.add(slotKey);
    }

    // 2. Check each slot against the database
    for (const dto of createAvailabilityDtos) {
      const existing = await this.availabilityRepository.findOne({
        where: {
          user: { id: userId },
          date: dto.date,
          startTime: dto.startTime,
          endTime: dto.endTime,
        },
      });

      if (existing) {
        throw new ConflictException(`Slot already exists: ${dto.date} ${dto.startTime}-${dto.endTime}`);
      }
    }

    const slotsData = createAvailabilityDtos.map(dto => ({ ...dto, user: { id: userId } }));
    const slots = this.availabilityRepository.create(slotsData);
    return this.availabilityRepository.save(slots);
  }

  /**
   * Fetches all availability slots belonging to a specific user.
   * @param userId The ID of the owner user.
   * @returns A promise resolving to an array of Availability entities, sorted by date.
   */
  async findAll(userId: string): Promise<Availability[]> {
    return this.availabilityRepository.find({
      where: { user: { id: userId } },
      order: { date: 'ASC' },
    });
  }

  /**
   * Deletes a specific availability slot if it belongs to the user.
   * @param id The ID of the slot to delete.
   * @param userId The ID of the user performing the deletion.
   * @throws NotFoundException if the slot is not found or doesn't belong to the user.
   */
  async remove(id: string, userId: string): Promise<void> {
    const slot = await this.availabilityRepository.findOne({ where: { id, user: { id: userId } } });
    if (!slot) throw new NotFoundException('Availability slot not found');
    await this.availabilityRepository.remove(slot);
  }
}
