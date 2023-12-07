import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { PrismaService } from './database/database.service';
import { EmailNotFoundMiddleware } from './middlewares/email-not-found.middleware';

@Module({
  imports: [],
  controllers: [EmailsController],
  providers: [EmailsService, PrismaService],
})
export class EmailsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmailNotFoundMiddleware).forRoutes('emails/:id');
  }
}
