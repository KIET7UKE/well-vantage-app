"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const workouts_module_1 = require("./workouts/workouts.module");
const availability_module_1 = require("./availability/availability.module");
const user_entity_1 = require("./users/entities/user.entity");
const workout_plan_entity_1 = require("./workouts/entities/workout-plan.entity");
const workout_day_entity_1 = require("./workouts/entities/workout-day.entity");
const exercise_entity_1 = require("./workouts/entities/exercise.entity");
const availability_entity_1 = require("./availability/entities/availability.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'wellvantage_user',
                password: 'wellvantage_password',
                database: 'wellvantage_db',
                entities: [user_entity_1.User, workout_plan_entity_1.WorkoutPlan, workout_day_entity_1.WorkoutDay, exercise_entity_1.Exercise, availability_entity_1.Availability],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            workouts_module_1.WorkoutsModule,
            availability_module_1.AvailabilityModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map