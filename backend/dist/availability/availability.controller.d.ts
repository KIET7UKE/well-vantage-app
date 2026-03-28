import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    create(req: any, createAvailabilityDtos: CreateAvailabilityDto[]): Promise<import("./entities/availability.entity").Availability[]>;
    findAll(req: any): Promise<import("./entities/availability.entity").Availability[]>;
    remove(req: any, id: string): Promise<void>;
}
