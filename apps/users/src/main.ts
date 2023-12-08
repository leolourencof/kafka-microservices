import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  
  await app.listen(3001);
}
bootstrap();
