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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Availability } from './availability/entities/availability.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        return {
          type: 'postgres',
          url: databaseUrl, // Use connection string if available (Render)
          host: !databaseUrl ? configService.get<string>('DB_HOST', 'localhost') : undefined,
          port: !databaseUrl ? configService.get<number>('DB_PORT', 5432) : undefined,
          username: !databaseUrl ? configService.get<string>('DB_USERNAME', 'wellvantage_user') : undefined,
          password: !databaseUrl ? configService.get<string>('DB_PASSWORD', 'wellvantage_password') : undefined,
          database: !databaseUrl ? configService.get<string>('DB_NAME', 'wellvantage_db') : undefined,
          entities: [User, WorkoutPlan, WorkoutDay, Exercise, Availability],
          synchronize: true, // Auto-create schemas (fine for initial deployment)
          ssl: databaseUrl ? { rejectUnauthorized: false } : false, // Enable SSL for cloud DBs
        };
      },
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
