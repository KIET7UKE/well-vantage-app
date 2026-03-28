import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by email or creates a new one if not found.
   * Updates the picture if it has changed.
   * @param email User's email address.
   * @param name User's full name.
   * @param googleId User's unique Google ID.
   * @param picture Optional URL to user's profile picture.
   * @returns A promise resolving to the User entity.
   */
  async findOrCreateUser(email: string, name: string, googleId: string, picture?: string): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      user = this.usersRepository.create({ email, name, googleId, picture });
      await this.usersRepository.save(user);
    } else if (picture && user.picture !== picture) {
      user.picture = picture;
      await this.usersRepository.save(user);
    }
    return user;
  }

  /**
   * Retrieves a user by their unique database ID.
   * @param id The UUID of the user.
   * @returns A promise resolving to the User entity or null if not found.
   */
  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}

