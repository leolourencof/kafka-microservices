import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/database.service';
import { Prisma, Email } from '.prisma/client/emails';

@Injectable()
export class EmailsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<Email[]> {
    return await this.prismaService.email.findMany();
  }

  async create(data: Prisma.EmailCreateInput): Promise<Email> {
    return await this.prismaService.email.create({ data });
  }

  async findFirst(id: string): Promise<Email> {
    return await this.prismaService.email.findFirst({ where: { id } });
  }

  async update(id: string, data: Prisma.EmailUpdateInput): Promise<Email> {
    return await this.prismaService.email.update({
      where: { user_id: id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.email.delete({ where: { user_id: id } });
  }
}
