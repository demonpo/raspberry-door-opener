import { User, Tokens, TokenData } from '../../entities';

export interface JWTGenerator {
  generateTokens(user: User): Tokens;
  decode(token: string): TokenData;
}

export const JWTGenerator = Symbol('JWTGenerator');
