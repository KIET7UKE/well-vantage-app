import { AvailabilityService } from './availability.service';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    create(req: any, createAvailabilityDtos: any[]): Promise<import("./entities/availability.entity").Availability[]>;
    findAll(req: any): Promise<import("./entities/availability.entity").Availability[]>;
    remove(req: any, id: string): Promise<void>;
}
