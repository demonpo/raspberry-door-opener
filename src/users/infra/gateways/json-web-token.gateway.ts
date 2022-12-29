import { Injectable } from '@nestjs/common';
import { sign, decode } from 'jsonwebtoken';
import { TokenData, Tokens, User } from '../../domain/entities';
import { JWTGenerator } from '../../domain/contracts/gateways';
import { env } from '../../../config/env';

@Injectable()
export class JsonWebTokenGateway implements JWTGenerator {
  generateTokens(user: User): Tokens {
    const accessToken = this.generateAccessToken(user);
    return { accessToken };
  }

  decode(token: string): TokenData {
    const userData: TokenData = decode(token) as TokenData;
    return userData;
  }

  private getTokenData(user: User): TokenData {
    const tokenData: TokenData = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return tokenData;
  }

  private generateAccessToken(user: User): string {
    const tokenData = this.getTokenData(user);

    const accessToken = sign(tokenData, env.jwtSecretKey, {
      expiresIn: '15m',
    });
    return accessToken;
  }
}
