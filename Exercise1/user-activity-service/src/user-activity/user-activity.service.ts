import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActivity } from './user-activity.entity';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(UserActivity)
    private readonly historyRepository: Repository<UserActivity>,
  ) {}

  async createHistory(action: string, userId: number) {
    const history = this.historyRepository.create({ action, userId });
    return this.historyRepository.save(history);
  }
 
  async findAll(userId?: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.historyRepository.find({
      where: { userId },
      skip,
      take: limit,
    });
  }
}
 