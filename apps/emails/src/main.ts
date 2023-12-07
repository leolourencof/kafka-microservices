import { NestFactory } from '@nestjs/core';
import { EmailsModule } from './emails.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EmailsModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'emails-consumer',
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(3002);
}
bootstrap();
