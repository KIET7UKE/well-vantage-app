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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutDay = void 0;
const typeorm_1 = require("typeorm");
const workout_plan_entity_1 = require("./workout-plan.entity");
const exercise_entity_1 = require("./exercise.entity");
let WorkoutDay = class WorkoutDay {
    id;
    dayLabel;
    muscleGroup;
    workoutPlan;
    exercises;
};
exports.WorkoutDay = WorkoutDay;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkoutDay.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkoutDay.prototype, "dayLabel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkoutDay.prototype, "muscleGroup", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workout_plan_entity_1.WorkoutPlan, (plan) => plan.days, { onDelete: 'CASCADE' }),
    __metadata("design:type", workout_plan_entity_1.WorkoutPlan)
], WorkoutDay.prototype, "workoutPlan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_entity_1.Exercise, (exercise) => exercise.workoutDay, { cascade: true }),
    __metadata("design:type", Array)
], WorkoutDay.prototype, "exercises", void 0);
exports.WorkoutDay = WorkoutDay = __decorate([
    (0, typeorm_1.Entity)('workout_days')
], WorkoutDay);
//# sourceMappingURL=workout-day.entity.js.map