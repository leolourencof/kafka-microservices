import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../database/database.service';

@Injectable()
export class EmailNotFoundMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const email = await this.prismaService.email.findFirst({
      where: { id: req.params.id },
    });

    if (!email) {
      throw new NotFoundException('Email not found');
    }

    next();
  }
}