import { Inject, Injectable } from '@nestjs/common';
import {
  ForbiddenError,
  HttpBaseError,
} from '@prometeo-dev/error-handler-library/dist/errors';
import { HashGenerator, JWTGenerator } from '../contracts/gateways';
import { Tokens, User } from '../entities';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    @Inject(HashGenerator)
    private readonly hashGenerator: HashGenerator,
    @Inject(JWTGenerator)
    private readonly jwtGenerator: JWTGenerator,
  ) {}

  async register(user: User): Promise<void> {
    try {
      user.password = await this.hashGenerator.generate(user.password);
      await this.userService.create(user);
    } catch (e) {
      // ERROR CODE 23505 -> email already exists
      if (e.code === '23505')
        throw new HttpBaseError({ message: 'Email already exists' });
      throw new HttpBaseError();
    }
  }

  async login(email: string, password: string): Promise<Tokens> {
    const user = await this.userService.findOneByEmail(email);

    const isValid = await this.hashGenerator.validate(password, user.password);
    if (!isValid)
      throw new ForbiddenError({ message: 'Password is not correct' });

    const tokens = await this.createTokens(user);
    return tokens;
  }

  private async createTokens(user: User): Promise<Tokens> {
    const tokens = this.jwtGenerator.generateTokens(user);
    return tokens;
  }
}
