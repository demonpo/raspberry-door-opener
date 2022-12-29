import { Controller, Get, Inject } from '@nestjs/common';
import { DoorService } from '../domain/services/door.service';

@Controller('door')
export class DoorController {
  constructor(
    @Inject(DoorService)
    private readonly doorService: DoorService,
  ) {}

  @Get('/open')
  async get() {
    return { message: 'ok' };
  }
}
