import { Inject, Injectable } from '@nestjs/common';
import { sleep } from '../../../utils';
import { Gpio as GpioGateway } from '../../domain/contracts/gateways';

@Injectable()
export class DoorService {
  constructor(
    @Inject(GpioGateway)
    private readonly gpio: GpioGateway,
  ) {}

  async open(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.gpio.writeGpio(17, 1);
        await sleep(1000);
        this.gpio.writeGpio(17, 0);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
