import { Injectable, NestMiddleware, ConflictException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../database/database.service';

@Injectable()
export class FindUniqueUserMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.prismaService.users.findUnique({
      where: { email: req.body.email ?? '' },
    });

    if (user) {
      throw new ConflictException('Email already exists');
    }

    next();
  }
}
