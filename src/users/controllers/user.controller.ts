import { Controller, Get, Inject, Headers } from '@nestjs/common';
import { JWTGenerator } from '../domain/contracts/gateways/jwt';
import { UsersService } from '../domain/services/users.service';
import { UserDtoMapper } from './mappers';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(JWTGenerator)
    private readonly jwtGenerator: JWTGenerator,
  ) {}

  @Get('/')
  async get(@Headers('Authorization') authorization: string) {
    const accessToken = authorization.split(' ')[1];
    const jwtData = this.jwtGenerator.decode(accessToken);
    const user = await this.usersService.findOneById(jwtData.sub);
    return { data: UserDtoMapper.toResponse(user) };
  }
}
