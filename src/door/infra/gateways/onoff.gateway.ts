import { Injectable } from '@nestjs/common';
import { Gpio as GpioGateway } from '../../domain/contracts/gateways';
import { Gpio } from 'onoff';

@Injectable()
export class OnOffGateway implements GpioGateway {
  writeGpio(pin: number, value: 0 | 1) {
    const relay = new Gpio(pin, 'out');
    relay.writeSync(value);
  }
}
