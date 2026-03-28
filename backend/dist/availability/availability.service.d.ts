import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';
export declare class AvailabilityService {
    private availabilityRepository;
    constructor(availabilityRepository: Repository<Availability>);
    createMany(userId: string, createAvailabilityDtos: any[]): Promise<Availability[]>;
    findAll(userId: string): Promise<Availability[]>;
    remove(id: string, userId: string): Promise<void>;
}
