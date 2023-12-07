import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/database.service';
import * as bcrypt from 'bcrypt';
import { Users } from '.prisma/client/users';
import { HandlersService } from './handlers/handlers.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly handleService: HandlersService,
  ) {}

  async findMany(): Promise<Users[]> {
    return await this.prismaService.users.findMany();
  }

  async create(data: CreateUserDto): Promise<Users> {
    const password = bcrypt.hashSync(data.password, 10);
    const user = await this.prismaService.users.create({
      data: { ...data, password },
    });

    await this.handleService.emitEventHandler('sputnik.create.user', user);
    return user;
  }

  async findFirst(id: string): Promise<Users> {
    return await this.prismaService.users.findFirst({ where: { id } });
  }

  async update(id: string, data: UpdateUserDto): Promise<Users> {
    let password: string;

    if (data.password) {
      password = bcrypt.hashSync(data.password, 10);
    }

    const user = await this.prismaService.users.update({
      where: { id },
      data: { ...data, password },
    });

    await this.handleService.emitEventHandler('sputnik.update.user', user);
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.prismaService.users.delete({ where: { id } });
    await this.handleService.emitEventHandler('sputnik.delete.user', user);
  }
}
