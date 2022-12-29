import { Injectable } from '@nestjs/common';

@Injectable()
export class DoorService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async open(): Promise<void> {
    return;
  }
}
