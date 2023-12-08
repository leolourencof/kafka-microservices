import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '.prisma/client/users';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findMany(): Promise<Users[]> {
    return await this.usersService.findMany();
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<Users> {
    return await this.usersService.create(data);
  }

  @Get(':id')
  async findFirst(@Param('id', ParseUUIDPipe) id: string): Promise<Users> {
    return await this.usersService.findFirst(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.update(id, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
