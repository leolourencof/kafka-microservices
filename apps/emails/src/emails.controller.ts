import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { Prisma, Email } from '.prisma/client/emails';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  async findMany(): Promise<Email[]> {
    return this.emailsService.findMany();
  }

  @MessagePattern('sputnik.create.user')
  async create(@Payload() data: Prisma.EmailCreateInput) {
    await this.emailsService.create(data);
  }

  @Get(':id')
  async findFirst(@Param('id', ParseUUIDPipe) id: string): Promise<Email> {
    return await this.emailsService.findFirst(id);
  }

  @MessagePattern('sputnik.update.user')
  async update(@Payload() data: Prisma.EmailUpdateInput) {
    await this.emailsService.update(data.user_id as string, data);
  }

  @MessagePattern('sputnik.delete.user')
  async delete(@Payload() data: { user_id: string }) {
    await this.emailsService.delete(data.user_id);
  }
}
