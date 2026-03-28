import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async createMany(userId: string, createAvailabilityDtos: any[]): Promise<Availability[]> {
    const slotsData = createAvailabilityDtos.map(dto => ({ ...dto, user: { id: userId } }));
    const slots = this.availabilityRepository.create(slotsData);
    return this.availabilityRepository.save(slots);
  }

  async findAll(userId: string): Promise<Availability[]> {
    return this.availabilityRepository.find({
      where: { user: { id: userId } },
      order: { date: 'ASC' },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const slot = await this.availabilityRepository.findOne({ where: { id, user: { id: userId } } });
    if (!slot) throw new NotFoundException('Availability slot not found');
    await this.availabilityRepository.remove(slot);
  }
}
