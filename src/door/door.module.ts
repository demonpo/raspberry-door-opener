import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DoorController } from './controllers/door.controller';
import { DoorService } from './domain/services/door.service';
import { SharedModule } from '../shared/shared.module';
import { JwtHandler } from '../shared/infra/middlewares';
import { Gpio } from './domain/contracts/gateways';
import { OnOffGateway } from './infra/gateways';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: Gpio, // Used as a symbol
      useClass: OnOffGateway,
    },
    DoorService,
  ],
  controllers: [DoorController],
  exports: [],
})
export class DoorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtHandler()).forRoutes('/door/open');
  }
}
