import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DoorController } from './controllers/door.controller';
import { DoorService } from './domain/services/door.service';
import { SharedModule } from '../shared/shared.module';
import { JwtHandler } from '../shared/infra/middlewares';

@Module({
  imports: [SharedModule],
  providers: [DoorService],
  controllers: [DoorController],
  exports: [],
})
export class DoorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtHandler()).forRoutes('/door/open');
  }
}
