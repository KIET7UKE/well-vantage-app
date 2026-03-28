import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
export declare class AvailabilityService {
    private availabilityRepository;
    constructor(availabilityRepository: Repository<Availability>);
    createMany(userId: string, createAvailabilityDtos: CreateAvailabilityDto[]): Promise<Availability[]>;
    findAll(userId: string): Promise<Availability[]>;
    remove(id: string, userId: string): Promise<void>;
}
