import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infra/typeorm/entities';
import { UserRepository } from './domain/contracts/repositories/user-repository';
import { ImplUserRepository } from './infra/typeorm/repositories/impl-user-repository';
import { UsersService } from './domain/services/users.service';
import { ExampleMiddleware } from '../shared/infra/middlewares/example.middleware';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './domain/services/auth.service';
import { HashGenerator, JWTGenerator } from './domain/contracts/gateways';
import { BcryptGateway, JsonWebTokenGateway } from './infra/gateways';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  providers: [
    {
      provide: UserRepository, // Used as a symbol
      useClass: ImplUserRepository,
    },
    {
      provide: HashGenerator,
      useClass: BcryptGateway,
    },
    {
      provide: JWTGenerator,
      useClass: JsonWebTokenGateway,
    },
    UsersService,
    AuthService,
  ],
  controllers: [UserController, AuthController],
  exports: [TypeOrmModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes(UserController);
  }
}
