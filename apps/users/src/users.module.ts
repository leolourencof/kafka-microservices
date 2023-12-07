import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from './database/database.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HandlersService } from './handlers/handlers.service';
import { UserNotFoundMiddleware } from './middlewares/user-not-found.middleware';
import { FindUniqueUserMiddleware } from './middlewares/find-unique-user.middleware';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users-producer',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, HandlersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserNotFoundMiddleware)
      .forRoutes('users/:id')
      .apply(FindUniqueUserMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
