import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';

@Controller('user-activity')
export class UserActivityController {

  constructor(private readonly userActivityService: UserActivityService) {}

  @Post()
  async createHistory(@Body() body: { action: string; user: { id: number } }) {
    return this.userActivityService.createHistory(body.action, body.user.id);
  }

  @Get()
  findAll(
    @Query('userId') userId?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userActivityService.findAll(userId, page, limit);
  }
}
