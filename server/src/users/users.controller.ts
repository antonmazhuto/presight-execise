import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindAllDto } from './dto/find-all.dto';
import type { UsersResponse } from './users.types';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  public findAll(@Query() query: FindAllDto): UsersResponse {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    return this.usersService.findAll({
      ...query,
      page,
      limit,
    });
  }

  @Get('stats')
  @HttpCode(200)
  getUsersStats() {
    return this.usersService.getUsersStats();
  }
}
