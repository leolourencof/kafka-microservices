import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Users } from '.prisma/client/users';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HandlersService {
  constructor(
    @Inject('USERS_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async emitEventHandler(event: string, data: Users): Promise<void> {
    try {
      await lastValueFrom(
        this.clientKafka.emit(event, {
          name: data.name,
          email: data.email,
          user_id: data.id,
        }),
      );
    } catch (error) {
      console.error(error.message);
    }
  }
}
