import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@prometeo-dev/error-handler-library/dist/errors';
import { UserRepository } from '../contracts/repositories/user-repository';
import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundError({ message: 'User not found' });

    return user;
  }

  async findOneById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new NotFoundError({ message: 'User not found' });

    return user;
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }
}
