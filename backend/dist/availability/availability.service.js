"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const availability_entity_1 = require("./entities/availability.entity");
let AvailabilityService = class AvailabilityService {
    availabilityRepository;
    constructor(availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }
    async createMany(userId, createAvailabilityDtos) {
        const seenSlots = new Set();
        for (const dto of createAvailabilityDtos) {
            const slotKey = `${dto.date}|${dto.startTime}|${dto.endTime}`;
            if (seenSlots.has(slotKey)) {
                throw new common_1.ConflictException(`Duplicate slot in request: ${dto.date} ${dto.startTime}-${dto.endTime}`);
            }
            seenSlots.add(slotKey);
        }
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
                throw new common_1.ConflictException(`Slot already exists: ${dto.date} ${dto.startTime}-${dto.endTime}`);
            }
        }
        const slotsData = createAvailabilityDtos.map(dto => ({ ...dto, user: { id: userId } }));
        const slots = this.availabilityRepository.create(slotsData);
        return this.availabilityRepository.save(slots);
    }
    async findAll(userId) {
        return this.availabilityRepository.find({
            where: { user: { id: userId } },
            order: { date: 'ASC' },
        });
    }
    async remove(id, userId) {
        const slot = await this.availabilityRepository.findOne({ where: { id, user: { id: userId } } });
        if (!slot)
            throw new common_1.NotFoundException('Availability slot not found');
        await this.availabilityRepository.remove(slot);
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(availability_entity_1.Availability)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map