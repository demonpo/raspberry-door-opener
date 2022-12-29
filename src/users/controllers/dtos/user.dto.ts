import { IsEmail, IsJWT, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  userId: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsJWT()
  refreshToken: string;
}

export class UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
