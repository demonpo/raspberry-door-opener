import { Controller, Inject, Post, Body } from '@nestjs/common';
import { LogInDto, RegisterDto } from './dtos';
import { AuthService } from '../domain/services/auth.service';
import { UserDtoMapper } from './mappers';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    const user = UserDtoMapper.registerDtoToDomain(payload);
    await this.authService.register(user);
    return {};
  }

  @Post('/login')
  async login(@Body() payload: LogInDto) {
    const { accessToken } = await this.authService.login(
      payload.email,
      payload.password,
    );
    return { data: { accessToken } };
  }
}
