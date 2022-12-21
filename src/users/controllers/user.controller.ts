import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from '../domain/services/users.service';
import { Gpio } from 'onoff';
import { sleep } from '../../utils';
const relay = new Gpio(17, 'out');

@Controller()
export class UserController {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  @Get('/test')
  async test() {
    return { message: 'test2' };
  }

  @Get('/test-gpio')
  async testGpio() {
    const promise = new Promise<void>(async (resolve, reject) => {
      relay.writeSync(1);
      await sleep(1000);
      relay.writeSync(0);
      resolve();
    });
    promise.then(console.log).catch(console.log);
    return { message: 'ok' };
  }

  @Get('/users')
  async findAll() {
    return {
      data: await this.usersService.find(),
    };
  }
}
