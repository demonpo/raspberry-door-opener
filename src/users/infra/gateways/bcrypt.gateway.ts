import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { HashGenerator } from '../../domain/contracts/gateways';

@Injectable()
export class BcryptGateway implements HashGenerator {
  async generate(input: string): Promise<string> {
    const saltRounds = 10;
    const hashedInput: string = await hash(input, saltRounds);
    return hashedInput;
  }

  async validate(input: string, storedHash: string): Promise<boolean> {
    const result: boolean = await compare(input, storedHash);
    return result;
  }
}
