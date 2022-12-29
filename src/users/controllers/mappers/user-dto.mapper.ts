import { User } from '../../domain/entities';
import { RegisterDto, UserResponse } from '../dtos';

export class UserDtoMapper {
  public static registerDtoToDomain(registerDto: RegisterDto) {
    return new User(registerDto);
  }

  public static toResponse(user: User): UserResponse {
    const response = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return response;
  }
}
