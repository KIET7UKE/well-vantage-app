import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { AvailabilityModule } from './availability/availability.module';
import { User } from './users/entities/user.entity';
import { WorkoutPlan } from './workouts/entities/workout-plan.entity';
import { WorkoutDay } from './workouts/entities/workout-day.entity';
import { Exercise } from './workouts/entities/exercise.entity';
import { Availability } from './availability/entities/availability.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'wellvantage_user',
      password: 'wellvantage_password',
      database: 'wellvantage_db',
      entities: [User, WorkoutPlan, WorkoutDay, Exercise, Availability],
      synchronize: true, // Auto-create schemas for dev
    }),
    AuthModule,
    UsersModule,
    WorkoutsModule,
    AvailabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
